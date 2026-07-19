import asyncio
import json
from dotenv import load_dotenv

# Load env variables
load_dotenv()

from agents.qna_tools import (
    fetch_questions,
    detect_question_pattern,
    draft_reply,
    suggest_listing_fix
)

async def test_all_tools():
    print("====================================================")
    print("         SHURUAAT AI Q&A TOOLS TESTS                ")
    print("====================================================")
    
    # 1. Test fetch_questions
    print("\n--- Test fetch_questions ---")
    kurti_qs = fetch_questions.invoke({"listing_id": "listing_kurti_01"})
    print(f"Retrieved {len(kurti_qs)} questions for 'listing_kurti_01'")
    for q in kurti_qs:
        print(f"  - {q['id']}: {q['question']} ({q['language']})")
        
    saree_qs = fetch_questions.invoke({"listing_id": "listing_saree_01"})
    print(f"Retrieved {len(saree_qs)} questions for 'listing_saree_01'")
    for q in saree_qs:
        print(f"  - {q['id']}: {q['question']} ({q['language']})")
        
    # 2. Test detect_question_pattern
    print("\n--- Test detect_question_pattern (Kurti: Sizing Cluster) ---")
    kurti_pattern = detect_question_pattern.invoke({"questions": kurti_qs})
    print(f"Kurti Pattern Analysis Result:")
    print(json.dumps(kurti_pattern, indent=2))
    assert kurti_pattern["pattern_found"] == True
    assert kurti_pattern["topic"] == "sizing"
    assert kurti_pattern["count"] >= 3
    print("Kurti Sizing Cluster detection: PASSED")
    
    print("\n--- Test detect_question_pattern (Saree: Fabric Cluster) ---")
    saree_pattern = detect_question_pattern.invoke({"questions": saree_qs})
    print(f"Saree Pattern Analysis Result:")
    print(json.dumps(saree_pattern, indent=2))
    assert saree_pattern["pattern_found"] == True
    assert saree_pattern["topic"] == "fabric"
    assert saree_pattern["count"] >= 3
    print("Saree Fabric Cluster detection: PASSED")
    
    # Mock Listing Context
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
    
    # 3. Test draft_reply
    print("\n--- Test draft_reply ---")
    single_q = "Does this come in size XL?"
    print(f"Drafting reply for question: '{single_q}'")
    # Using Llama 3.3 for drafting
    reply = await draft_reply.ainvoke({
        "question": single_q,
        "listing_context": mock_listing,
        "target_language": "English"
    })
    print(f"Drafted Reply:\n{reply}")
    
    # 4. Test suggest_listing_fix
    print("\n--- Test suggest_listing_fix ---")
    matched_questions = [q["question"] for q in kurti_qs if q["id"] in kurti_pattern["matched_question_ids"]]
    print(f"Suggesting listing fix for topic '{kurti_pattern['topic']}' based on matches...")
    fix = await suggest_listing_fix.ainvoke({
        "topic": kurti_pattern["topic"],
        "matched_questions": matched_questions,
        "current_listing": mock_listing
    })
    print(f"Suggested Fix:\n{json.dumps(fix, indent=2)}")

if __name__ == "__main__":
    asyncio.run(test_all_tools())
