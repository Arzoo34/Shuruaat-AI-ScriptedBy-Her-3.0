# Shuruaat AI Listing Agent Evaluator Module

This module runs evaluations and validations over Shuruaat AI's Listing Agent outputs against pre-defined test scenarios.

## File Structure

```
/backend/evaluator
  ├── __init__.py           - Package initialization
  ├── test_cases.json       - JSON database of validation test scenarios
  ├── evaluation_tools.py   - LangChain @tools performing output check logic
  ├── evaluator_agent.py    - Modern tool-calling Agent executor
  └── README.md             - Module documentation (this file)
```

## Test Scenario Schema

Test cases are structured inside `test_cases.json` as a JSON array of scenarios:

```json
[
  {
    "id": "TC1",
    "description": "Voice only, no image, no pincode",
    "input": {
      "audio_file": "samples/voice_kurti.wav",
      "image_files": [],
      "declared_category": "kurti",
      "target_language": "Hindi",
      "pincode": null,
      "input_text": "Premium cotton kurti daily wear."
    },
    "expected": {
      "category_mismatch_flagged": false,
      "final_listing_not_null": true,
      "expected_tools": ["transcribe_audio", "generate_listing_content", "score_return_risk"],
      "min_risk_score": 10,
      "max_risk_score": 90
    }
  }
]
```

## How to Run Validation Tools Test

To check imports and run direct tool assertions:
```bash
python -m backend.test_evaluation_tools
```
