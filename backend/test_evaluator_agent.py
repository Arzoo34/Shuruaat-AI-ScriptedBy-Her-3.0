import asyncio
import os
import json as json_lib
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add backend directory to sys.path
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from evaluator.evaluator_agent import get_evaluator_agent_executor

async def main():
    print("====================================================")
    print("        SHURUAAT AI EVALUATOR AGENT TEST            ")
    print("====================================================")
    
    try:
        executor = get_evaluator_agent_executor()
    except Exception as e:
        print(f"Failed to initialize Evaluator Agent Executor: {e}")
        return

    # Hardcoded test case (TC1 - Voice only)
    tc1 = {
        "id": "TC1",
        "description": "Voice only, no image, no pincode",
        "input": {
            "audio_file": "samples/voice_kurti.wav",
            "image_files": [],
            "declared_category": "kurti",
            "target_language": "Hindi",
            "pincode": None,
            "input_text": "Premium cotton kurti daily wear."
        },
        "expected": {
            "category_mismatch_flagged": False,
            "final_listing_not_null": True,
            "expected_tools": ["transcribe_audio", "generate_listing_content", "score_return_risk"],
            "min_risk_score": 10,
            "max_risk_score": 90
        }
    }
    
    input_str = json_lib.dumps(tc1)
    
    print("\n--- Invoking Evaluator Agent ---")
    print(f"Input JSON Payload:\n{input_str}\n")
    
    try:
        # Run agent
        result = await executor.ainvoke({"input": input_str})
        
        print("\n--- Execution Complete ---")
        print("\n[Final Output Report]:")
        print(result.get("output"))
        
        print("\n[Intermediate Steps / Reasoning Trace]:")
        for i, step in enumerate(result.get("intermediate_steps", [])):
            action, observation = step
            print(f"\nStep {i+1}:")
            args_str = json_lib.dumps(action.tool_input, ensure_ascii=True)
            print(f" -> Action (Tool Call): {action.tool} with args: {args_str}")
            obs_str = json_lib.dumps(observation, ensure_ascii=True)
            print(f" -> Observation (Tool Output): {obs_str}")
            
    except Exception as e:
        print(f"Execution Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
