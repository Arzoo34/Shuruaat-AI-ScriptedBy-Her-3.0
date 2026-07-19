import asyncio
import os
import json as json_lib
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Add backend directory to sys.path so it works with python -m backend.test_evaluation_tools
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# Import the evaluation tools
from evaluator.evaluation_tools import (
    load_test_cases,
    run_listing_agent_on_case,
    run_listing_agent,
    validate_listing_structure,
    validate_risk_score,
    validate_category_mismatch_handling,
    validate_trace_tool_usage
)

async def test_tools_directly():
    print("====================================================")
    print("        EVALUATION TOOLS DIRECT TEST                ")
    print("====================================================")
    
    # 1. Test load_test_cases
    print("\n[1] Tool: load_test_cases...")
    test_cases = load_test_cases.invoke({})
    print(f" -> Success! Loaded {len(test_cases)} test cases.")
    
    # 2. Test validate_listing_structure
    print("\n[2] Tool: validate_listing_structure...")
    mock_good_listing = {
        "final_listing": {
            "title": "Premium Cotton Kurti",
            "bullets": ["Soft material", "Breathable style", "3/4 sleeves", "Easy wash", "Daily wear"],
            "size_chart": {"S": "36 in", "M": "38 in"},
            "price": 899,
            "keywords": ["cotton", "kurti"]
        }
    }
    mock_bad_listing = {
        "final_listing": {
            "title": "Premium Cotton Kurti",
            "bullets": ["Only 1 bullet"],
            "price": 899
        }
    }
    
    res_struct_good = validate_listing_structure.invoke({"listing_output": mock_good_listing})
    res_struct_bad = validate_listing_structure.invoke({"listing_output": mock_bad_listing})
    print(f" -> Good Listing: {res_struct_good}")
    print(f" -> Bad Listing:  {res_struct_bad}")
    
    # 3. Test validate_risk_score
    print("\n[3] Tool: validate_risk_score...")
    mock_good_risk = {
        "return_risk_score_pct": 45,
        "unresolved_issues": [{"issue": "color_variation"}]
    }
    mock_bad_risk = {
        "return_risk_score_pct": 105,
        "unresolved_issues": []
    }
    
    res_risk_good = validate_risk_score.invoke({"risk_score": mock_good_risk, "category": "kurti"})
    res_risk_bad = validate_risk_score.invoke({"risk_score": mock_bad_risk, "category": "kurti"})
    print(f" -> Good Risk: {res_risk_good}")
    print(f" -> Bad Risk:  {res_risk_bad}")
    
    # 4. Test validate_category_mismatch_handling
    print("\n[4] Tool: validate_category_mismatch_handling...")
    mock_mismatch_good = {
        "category_mismatch_flagged": True,
        "final_listing": None,
        "mismatch_message": "Declared category does not match image."
    }
    mock_mismatch_bad = {
        "category_mismatch_flagged": False,
        "final_listing": None
    }
    
    res_mismatch_good = validate_category_mismatch_handling.invoke({
        "output": mock_mismatch_good,
        "expected_category": "kurti"
    })
    res_mismatch_bad = validate_category_mismatch_handling.invoke({
        "output": mock_mismatch_bad,
        "expected_category": "kurti"
    })
    print(f" -> Good Mismatch Handled: {res_mismatch_good}")
    print(f" -> Bad Mismatch Handled:  {res_mismatch_bad}")
    
    # 5. Test validate_trace_tool_usage
    print("\n[5] Tool: validate_trace_tool_usage...")
    mock_trace = {
        "agent_reasoning_trace": [
            {"tool_called": "analyze_product_image"},
            {"tool_called": "check_category_mismatch"}
        ]
    }
    res_trace_ok = validate_trace_tool_usage.invoke({
        "output": mock_trace,
        "expected_tools": ["analyze_product_image", "check_category_mismatch"]
    } )
    res_trace_fail = validate_trace_tool_usage.invoke({
        "output": mock_trace,
        "expected_tools": ["analyze_product_image", "check_pincode_risk"]
    } )
    print(f" -> Trace matches: {res_trace_ok}")
    print(f" -> Trace missing: {res_trace_fail}")
    
    # 6. Test run_listing_agent helper and run_listing_agent_on_case (run on the first text-only testcase)
    if len(test_cases) > 0:
        print("\n[6] Helper: run_listing_agent & Tool: run_listing_agent_on_case...")
        case = test_cases[0]
        description = case.get("description", case.get("name", "Unnamed"))
        print(f"Running agent on: {description}...")
        try:
            # Test direct helper execution
            res_helper = await run_listing_agent(case)
            print(" -> Helper output structured keys: ", list(res_helper.keys()))
            print(f" -> fallback_used: {res_helper.get('fallback_used')}")
            
            # Test tool execution
            res_agent = await run_listing_agent_on_case.ainvoke({"test_case": case})
            print(f" -> Tool output 'fallback_used': {res_agent.get('fallback_used')}")
            print(f" -> Final Output Summary: {json_lib.dumps(res_agent.get('output'), ensure_ascii=True)}")
            print(" -> Trace Verification:")
            expected_tools = case.get("expected", {}).get("expected_tools", [])
            trace_check = validate_trace_tool_usage.invoke({
                "output": res_agent,
                "expected_tools": expected_tools
            })
            print(f"    Tool usage matches expected: {trace_check['correct']} (missing: {trace_check['missing']})")
        except Exception as e:
            print(f" -> Agent Run Failed: {e}")

if __name__ == "__main__":
    asyncio.run(test_tools_directly())
