import asyncio
import os
import subprocess
import time
import httpx
import json

async def run_full_suite():
    print("Starting FastAPI Uvicorn server on port 8000...")
    server_process = subprocess.Popen(
        ["python", "-m", "uvicorn", "main:app", "--port", "8000", "--host", "127.0.0.1"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    
    # Wait for server to boot up
    time.sleep(3)
    
    try:
        # Increase timeout to support sequential execution of all 7 test cases
        async with httpx.AsyncClient(timeout=120.0) as client:
            print("Sending request to /api/evaluation/run-suite to execute all test cases...")
            response = await client.post(
                "http://127.0.0.1:8000/api/evaluation/run-suite",
                json={}  # Empty test_ids runs all test cases
            )
            
            print(f"Status Code: {response.status_code}")
            res_json = response.json()
            
            print("\n==============================================")
            print("         FULL TEST SUITE EVALUATION RESULTS    ")
            print("==============================================")
            print(f"Total Tests Run: {res_json.get('total_tests')}")
            print(f"Passed:          {res_json.get('passed')}")
            print(f"Failed:          {res_json.get('failed')}")
            print("==============================================\n")
            
            for result in res_json.get("results", []):
                print(f"Test ID:     {result.get('test_id')}")
                print(f"Description: {result.get('description')}")
                print(f"Status:      {result.get('status')}")
                if result.get("error"):
                    print(f"Error:       {result.get('error')}")
                print("-" * 46)
                
    except Exception as e:
        print(f"Failed to complete full suite validation: {e}")
    finally:
        print("\nStopping FastAPI server...")
        server_process.terminate()
        server_process.wait()

if __name__ == "__main__":
    asyncio.run(run_full_suite())
