import os
import logging
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_classic.agents import create_tool_calling_agent, AgentExecutor

# Import evaluator tools
from evaluator.evaluation_tools import (
    load_test_cases,
    run_listing_agent_on_case,
    validate_listing_structure,
    validate_risk_score,
    validate_category_mismatch_handling,
    validate_trace_tool_usage
)

logger = logging.getLogger(__name__)

def get_evaluator_agent_executor() -> AgentExecutor:
    """
    Initializes and returns the LangChain AgentExecutor for the Shuruaat AI Evaluator Agent.
    Configured with evaluation-specific validation tools.
    """
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY environment variable is not set")
        
    llm = ChatGroq(
        model="llama-3.1-8b-instant",
        groq_api_key=api_key,
        temperature=0.0,
        max_retries=1
    )
    
    tools = [
        load_test_cases,
        run_listing_agent_on_case,
        validate_listing_structure,
        validate_risk_score,
        validate_category_mismatch_handling,
        validate_trace_tool_usage
    ]
    
    prompt = ChatPromptTemplate.from_messages([
        ("system", (
            "You are the Evaluator Agent for Shuruaat AI. Your job is to run a test case through the Listing Agent and then validate the result against expectations.\n"
            "First, call run_listing_agent_on_case with either the test case dictionary or the test case ID string (e.g., 'TC1'). Passing the test case ID string is highly recommended to save tokens and prevent tool call argument formatting errors.\n"
            "Then use the validation tools (validate_listing_structure, validate_risk_score, validate_category_mismatch_handling, validate_trace_tool_usage) to check the output.\n"
            "Finally, produce a summary report: PASS/FAIL for each validation, along with a detailed explanation."
        )),
        MessagesPlaceholder(variable_name="chat_history", optional=True),
        ("human", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad")
    ])
    
    agent = create_tool_calling_agent(llm, tools, prompt)
    
    return AgentExecutor(
        agent=agent,
        tools=tools,
        verbose=True,
        return_intermediate_steps=True
    )
