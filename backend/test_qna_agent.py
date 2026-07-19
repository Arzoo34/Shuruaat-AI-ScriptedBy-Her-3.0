import asyncio
import json
from dotenv import load_dotenv

# Load env variables
load_dotenv()

from agents.qna_agent import get_qna_agent_executor

async def main():
    print("====================================================")
    print("         SHURUAAT AI Q&A AGENT TEST RUN              ")
    print("====================================================")
    
    mock_listing = {
        "title": "Classic Cotton A-Line Kurti with Floral Prints",
        "bullets": [
            "Made from 100% premium soft cotton fabric for all-day comfort and breathability.",
            "Elegant floral pattern with traditional prints, suitable for casual and office wear.",
            "Features a refined round neck, three-quarter sleeves, and A-line silhouette.",
            "Easy home wash; colors are guaranteed fast and fade-resistant.",
            "Perfect pairing with leggings, palazzos, or jeans for a complete look."
        ],
        "size_chart": {
            "S": "Bust: 36 in, Length: 44 in",
            "M": "Bust: 38 in, Length: 44 in",
            "L": "Bust: 40 in, Length: 44 in"
        },
        "price": 799,
        "keywords": ["cotton kurti", "floral printed kurti", "A-line kurti"]
    }
    
    # Construct input prompt detailing ID and Context
    input_str = (
        "Please process the buyer questions for listing_id: 'listing_kurti_01'.\n"
        "Here is the listing_context for this product:\n"
        f"{json.dumps(mock_listing, indent=2)}"
    )
    
    executor = get_qna_agent_executor()
    
    print("\n--- Invoking Q&A Agent Executor ---")
    try:
        result = await executor.ainvoke({"input": input_str})
        
        print("\n==============================================")
        print("                 AGENT OUTPUT                 ")
        print("==============================================")
        print(result.get("output"))
        print("==============================================\n")
        
        print("\n==============================================")
        print("             INTERMEDIATE STEPS TRACE         ")
        print("==============================================")
        for i, (action, observation) in enumerate(result.get("intermediate_steps", []), 1):
            print(f"Step {i}:")
            print(f"  -> Tool Called: {action.tool}")
            print(f"  -> Tool Input:  {json.dumps(action.tool_input)}")
            # Truncate output summary if it is long
            obs_str = str(observation)
            if len(obs_str) > 300:
                obs_str = obs_str[:300] + "..."
            print(f"  -> Tool Output: {obs_str}")
            print("-" * 46)
        print("==============================================\n")
        
    except Exception as e:
        print(f"Error during Q&A Agent execution: {e}")

if __name__ == "__main__":
    asyncio.run(main())
