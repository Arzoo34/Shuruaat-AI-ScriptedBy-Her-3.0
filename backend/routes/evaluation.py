import os
import json
import logging
import asyncio
from typing import List, Optional
from fastapi import APIRouter, HTTPException
from models.schemas import RunSuiteRequest, RunSuiteResponse, TestCaseResult
from evaluator.evaluator_agent import get_evaluator_agent_executor

router = APIRouter(prefix="/api/evaluation", tags=["evaluation"])
logger = logging.getLogger(__name__)

# Resolve path to test_cases.json
EVALUATOR_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
TEST_CASES_PATH = os.path.join(EVALUATOR_DIR, "evaluator", "test_cases.json")

@router.post("/run-suite", response_model=RunSuiteResponse)
async def run_suite(request: RunSuiteRequest):
    """
    POST /api/evaluation/run-suite
    Runs the Evaluator Agent sequentially across selected or all test cases from test_cases.json.
    """
    if not os.path.exists(TEST_CASES_PATH):
        raise HTTPException(status_code=500, detail="Test cases database not found.")
        
    try:
        with open(TEST_CASES_PATH, "r") as f:
            all_cases = json.load(f)
    except Exception as e:
        logger.error(f"Failed to read test cases: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to read test cases: {str(e)}")

    # Filter test cases by test_ids if specified
    if request.test_ids:
        test_ids_set = set(request.test_ids)
        test_cases = [case for case in all_cases if case.get("id") in test_ids_set]
    else:
        test_cases = all_cases
        
    if not test_cases:
        return {
            "total_tests": 0,
            "passed": 0,
            "failed": 0,
            "results": []
        }
        
    results = []
    passed_count = 0
    failed_count = 0
    
    # Initialize Evaluator Executor
    try:
        executor = get_evaluator_agent_executor()
    except Exception as e:
        logger.error(f"Failed to build Evaluator Agent executor: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to initialize Evaluator Agent: {str(e)}")
        
    for case in test_cases:
        case_id = case.get("id", "Unknown")
        description = case.get("description", "Unnamed Case")
        
        status = "PASSED"
        report = None
        error_msg = None
        
        try:
            # Run the Evaluator Agent on the test case
            result = await executor.ainvoke({"input": json.dumps(case)})
            report = result.get("output")
            
            # Analyze intermediate steps to confirm all validation checks passed
            for action, observation in result.get("intermediate_steps", []):
                # Check structure and risk validators
                if action.tool in ["validate_listing_structure", "validate_risk_score"]:
                    if isinstance(observation, dict) and not observation.get("valid", True):
                        status = "FAILED"
                        break
                # Check mismatch and trace validators
                elif action.tool in ["validate_category_mismatch_handling", "validate_trace_tool_usage"]:
                    if isinstance(observation, dict) and not observation.get("correct", True):
                        status = "FAILED"
                        break
                        
        except Exception as e:
            logger.error(f"Error during evaluation run of test case {case_id}: {e}")
            status = "FAILED"
            error_msg = str(e)
            
        if status == "PASSED":
            passed_count += 1
        else:
            failed_count += 1
            
        results.append(TestCaseResult(
            test_id=case_id,
            description=description,
            status=status,
            report=report,
            error=error_msg
        ))
        
        # Add rate-limit backoff delay between sequential test case invocations
        await asyncio.sleep(15)
        
    return {
        "total_tests": len(test_cases),
        "passed": passed_count,
        "failed": failed_count,
        "results": results
    }
