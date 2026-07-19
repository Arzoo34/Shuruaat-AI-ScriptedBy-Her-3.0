import os
import json
import logging
import asyncio
from typing import Dict, Any, List
from fastapi import APIRouter, HTTPException
from models.schemas import QnaAgentRequest, QnaAgentResponse, QnaIndividualReply, QnaPatternFlag, AgentTraceStep
from agents.qna_agent import get_qna_agent_executor

router = APIRouter(prefix="/api/qna", tags=["qna"])
logger = logging.getLogger(__name__)

BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FALLBACK_PATH = os.path.join(BACKEND_DIR, "data", "fallback_qna.json")

def load_fallback_data(listing_id: str) -> Dict[str, Any]:
    """Helper to load pre-written static fallback replies on agent executor failure."""
    if os.path.exists(FALLBACK_PATH):
        try:
            with open(FALLBACK_PATH, "r") as f:
                db = json.load(f)
            if listing_id in db:
                return db[listing_id]
        except Exception as e:
            logger.error(f"Failed to load fallback_qna.json: {e}")
            
    # Generic default fallback structure
    return {
        "individual_replies": [
            {
                "question_id": "fallback_generic",
                "question": "General buyer query",
                "drafted_reply": "Thank you for your query. Our merchant team will verify this detail and update the product description shortly."
            }
        ],
        "pattern_flags": []
    }

@router.post("/run-agent", response_model=QnaAgentResponse)
async def run_qna_agent(request: QnaAgentRequest):
    """
    POST /api/qna/run-agent
    Invokes the Q&A AgentExecutor to analyze questions, cluster patterns, generate listing suggestions, and reply to one-offs.
    Falls back to pre-computed static JSON responses on failure.
    """
    input_str = (
        f"Please process the buyer questions for listing_id: '{request.listing_id}'.\n"
        f"Here is the listing_context for this product:\n"
        f"{json.dumps(request.current_listing, ensure_ascii=False)}"
    )
    
    try:
        executor = get_qna_agent_executor()
    except Exception as e:
        logger.error(f"Failed to build Q&A Agent executor: {e}")
        # Build immediate fallback response
        fb = load_fallback_data(request.listing_id)
        return QnaAgentResponse(
            individual_replies=[QnaIndividualReply(**r) for r in fb.get("individual_replies", [])],
            pattern_flags=[QnaPatternFlag(**p) for p in fb.get("pattern_flags", [])],
            agent_reasoning_trace=[AgentTraceStep(tool_called="error", input_summary="system_init", output_summary=str(e))],
            fallback_used=True
        )
        
    try:
        # Run agent with 30s timeout
        result = await asyncio.wait_for(
            executor.ainvoke({"input": input_str}),
            timeout=120.0
        )
        
        # Programmatic parsing from intermediate_steps
        fetched_questions = []
        topic_counts = {}
        individual_replies = []
        pattern_flags = []
        agent_reasoning_trace = []
        
        for action, observation in result.get("intermediate_steps", []):
            tool_name = action.tool
            tool_input = action.tool_input
            
            # Format inputs/outputs for schema trace response
            in_sum = json.dumps(tool_input, ensure_ascii=True)
            out_sum = json.dumps(observation, ensure_ascii=True)
            if len(in_sum) > 200:
                in_sum = in_sum[:200] + "..."
            if len(out_sum) > 200:
                out_sum = out_sum[:200] + "..."
                
            agent_reasoning_trace.append(AgentTraceStep(
                tool_called=tool_name,
                input_summary=in_sum,
                output_summary=out_sum
            ))
            
            # Extract logic findings from steps
            if tool_name == "fetch_questions":
                if isinstance(observation, list):
                    fetched_questions = observation
            elif tool_name == "detect_question_pattern":
                if isinstance(observation, dict) and observation.get("pattern_found"):
                    topic_counts[observation.get("topic")] = observation.get("count", 3)
            elif tool_name == "draft_reply":
                q_text = tool_input.get("question")
                q_id = "unknown"
                for q in fetched_questions:
                    if str(q.get("question", "")).strip().lower() == str(q_text).strip().lower():
                        q_id = q.get("id")
                        break
                individual_replies.append(QnaIndividualReply(
                    question_id=q_id,
                    question=q_text,
                    drafted_reply=str(observation)
                ))
            elif tool_name == "suggest_listing_fix":
                topic = tool_input.get("topic")
                count = topic_counts.get(topic, 3)
                if isinstance(observation, dict):
                    suggested_val = observation.get("suggested_addition", "")
                    if not isinstance(suggested_val, str):
                        suggested_val = json.dumps(suggested_val, ensure_ascii=False)
                    pattern_flags.append(QnaPatternFlag(
                        topic=topic,
                        question_count=count,
                        suggested_addition=suggested_val,
                        field_to_update=observation.get("field_to_update", "")
                    ))
                    
        return QnaAgentResponse(
            individual_replies=individual_replies,
            pattern_flags=pattern_flags,
            agent_reasoning_trace=agent_reasoning_trace,
            fallback_used=False
        )
        
    except Exception as e:
        logger.error(f"Q&A Agent run failed: {e}. Recovering with fallback schema.")
        fb = load_fallback_data(request.listing_id)
        return QnaAgentResponse(
            individual_replies=[QnaIndividualReply(**r) for r in fb.get("individual_replies", [])],
            pattern_flags=[QnaPatternFlag(**p) for p in fb.get("pattern_flags", [])],
            agent_reasoning_trace=[AgentTraceStep(tool_called="error", input_summary="execute_run", output_summary=str(e))],
            fallback_used=True
        )
