import os
import json
import logging
from typing import Dict, Any
from services import llm_client

logger = logging.getLogger(__name__)

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "data")
MOCK_DATA_PATH = os.path.join(DATA_DIR, "mock_health_briefs.json")

def get_weekly_brief(seller_id: str) -> dict:
    """
    Looks up the seller_id in mock_health_briefs.json and returns the matching brief.
    If seller_id is not found, defaults gracefully to seller_demo_1.
    """
    try:
        if os.path.exists(MOCK_DATA_PATH):
            with open(MOCK_DATA_PATH, "r", encoding="utf-8") as f:
                briefs = json.load(f)
            if seller_id in briefs:
                return briefs[seller_id]
            # Graceful fallback to seller_demo_1 if seller_id is unknown
            return briefs.get("seller_demo_1")
    except Exception as e:
        logger.error(f"Error reading mock_health_briefs.json: {e}")
        
    # hardcoded fallback just in case the file reading fails entirely
    return {
        "seller_name": "Priya",
        "week_range": "July 7 - July 13, 2026",
        "return_rate": 18,
        "return_rate_trend": "down_from_24",
        "cod_returns": 5,
        "prepaid_returns": 0,
        "top_complaint_theme": "Sizing felt smaller than expected",
        "total_orders": 32,
        "money_saved_estimate": 600,
        "recommendation": "5 COD returns, 0 prepaid this week. Switching to prepaid-only above ₹700 could save an estimated ₹600/week.",
        "recommendation_action": "switch_cod_threshold",
        "recommendation_action_value": 700
    }

async def generate_narrative_summary(brief_data: dict, target_language: str) -> tuple[str, str]:
    """
    Calls llm_client.generate_structured() to produce a one-paragraph, warm, conversational
    narrative version of the brief in the seller's language.
    If this call fails (or throws any exception), falls back to a simple template-based sentence.
    
    Returns:
        (narrative_summary_str, narrative_source_str)
    """
    lang = target_language.lower()
    
    prompt = (
        f"You are Shuruaat AI, a warm, supportive, and wise assistant for home-based craft sellers in India.\n"
        f"Write a short, friendly, conversational one-paragraph weekly business summary (personal note style) in {target_language} for a seller named {brief_data['seller_name']}.\n"
        f"Use these details:\n"
        f"- Timeframe: {brief_data['week_range']}\n"
        f"- Total Orders: {brief_data['total_orders']}\n"
        f"- Return Rate: {brief_data['return_rate']}% (trend: {brief_data['return_rate_trend']})\n"
        f"- Top Issue: {brief_data['top_complaint_theme']}\n"
        f"- Recommendation: {brief_data['recommendation']}\n\n"
        f"Make it encouraging and helpful. Frame it as a warm note. Do not output tables or bullet points, just one cohesive paragraph.\n"
        f"Return a JSON object with a single key 'narrative' containing the text."
    )
    
    try:
        # Attempt LLM generation
        result = await llm_client.generate_structured(prompt, target_language)
        if isinstance(result, dict) and "narrative" in result:
            return result["narrative"], "llm"
        elif isinstance(result, dict) and len(result) > 0:
            # If the LLM returned JSON but with a different key, try to extract first value
            return list(result.values())[0], "llm"
        else:
            raise ValueError("LLM response did not contain narrative text.")
    except Exception as e:
        logger.warning(f"Failed to generate LLM narrative: {e}. Using template fallback.")
        
    # Template fallback logic
    trend_str = brief_data['return_rate_trend'].replace('_', ' ')
    
    if lang in ["hindi", "hi"]:
        summary = (
            f"नमस्ते {brief_data['seller_name']}! {brief_data['week_range']} के लिए यह आपका साप्ताहिक व्यापार अपडेट है। "
            f"इस सप्ताह आपको कुल {brief_data['total_orders']} ऑर्डर मिले। आपकी वापसी (return) दर वर्तमान में {brief_data['return_rate']}% "
            f"({trend_str}) है। ग्राहकों से मुख्य शिकायत रही: '{brief_data['top_complaint_theme']}'। "
            f"आपके व्यवसाय को और मजबूत करने के लिए हमारा सुझाव है: {brief_data['recommendation']}"
        )
    else:
        summary = (
            f"Hello {brief_data['seller_name']}! Here is your weekly update for {brief_data['week_range']}. "
            f"You received {brief_data['total_orders']} orders this week. Your return rate is at {brief_data['return_rate']}% "
            f"({trend_str}). The main feedback from buyers was: '{brief_data['top_complaint_theme']}'. "
            f"To improve your shop's performance, here is our tip: {brief_data['recommendation']}"
        )
        
    return summary, "template_fallback"
