import asyncio
from dotenv import load_dotenv
import json as json_lib

# Load environment variables
load_dotenv()

from agents.listing_agent import get_listing_agent_executor

async def main():
    print("====================================================")
    print("         SHURUAAT AI LISTING AGENT TEST             ")
    print("====================================================")
    
    try:
        executor = get_listing_agent_executor()
    except Exception as e:
        print(f"Failed to initialize Agent Executor: {e}")
        return

    # Mock user input with only text details, declared category, and a delivery pincode
    input_text = (
        "Hello, I want to create a listing for a premium cotton kurti. "
        "It is indigo blue, features hand-block print designs, three-quarter sleeves, "
        "and is comfortable for daily wear. Recommending a price of 999 INR."
    )
    user_query = (
        f"Seller Input Text: {input_text}\n"
        f"Declared Category: kurti\n"
        f"Delivery Pincode: 110001\n"
        f"Audio Provided: No\n"
        f"Image Provided: No"
    )
    
    print("\n--- Invoking Agent ---")
    print(f"Query:\n{user_query}\n")
    
    try:
        # Run agent
        result = await executor.ainvoke({"input": user_query})
        
        print("\n--- Execution Complete ---")
        print("\n[Final Output]:")
        # Print using representation/ascii safety for Devanagari (Hindi) on Windows console
        print(json_lib.dumps(result.get("output"), ensure_ascii=True, indent=2))
        
        print("\n[Intermediate Steps / Reasoning Trace]:")
        for i, step in enumerate(result.get("intermediate_steps", [])):
            action, observation = step
            print(f"\nStep {i+1}:")
            args_str = json_lib.dumps(action.tool_input, ensure_ascii=True)
            print(f" -> Action (Tool Call): {action.tool} with args: {args_str}")
            # Format and print observation safely
            obs_str = json_lib.dumps(observation, ensure_ascii=True)
            print(f" -> Observation (Tool Output): {obs_str}")
            
    except Exception as e:
        print(f"Execution Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())
