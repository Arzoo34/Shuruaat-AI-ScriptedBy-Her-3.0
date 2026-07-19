import logging
from typing import Optional
from fastapi import APIRouter, HTTPException
from models.schemas import (
    HealthBriefResponse,
    HealthBriefStats,
    HealthBriefRecommendation,
    ApplySuggestionRequest,
    ApplySuggestionResponse
)
from services.health_brief_service import get_weekly_brief, generate_narrative_summary

router = APIRouter(prefix="/api/health-brief", tags=["health-brief"])
logger = logging.getLogger(__name__)

@router.get("/weekly-summary", response_model=HealthBriefResponse)
async def get_weekly_summary(seller_id: str, target_language: str, seller_name: Optional[str] = None):
    """
    GET /api/health-brief/weekly-summary
    Fetches structured weekly report data and calls llm_client to generate a friendly localized narrative.
    Defaults to seller_demo_1 and template fallback on failures.
    """
    try:
        # Fetch the brief (defaults to seller_demo_1 if not found)
        brief = get_weekly_brief(seller_id)
        if seller_name:
            brief["seller_name"] = seller_name
        
        # Generate conversational narrative (falls back to local templates if LLM fails)
        narrative, source = await generate_narrative_summary(brief, target_language)
        
        # Package into the schema response
        return HealthBriefResponse(
            seller_name=brief["seller_name"],
            week_range=brief["week_range"],
            stats=HealthBriefStats(
                return_rate=brief["return_rate"],
                return_rate_trend=brief["return_rate_trend"],
                cod_returns=brief["cod_returns"],
                prepaid_returns=brief["prepaid_returns"],
                top_complaint_theme=brief["top_complaint_theme"],
                total_orders=brief["total_orders"]
            ),
            recommendation=HealthBriefRecommendation(
                text=brief["recommendation"],
                money_saved_estimate=brief["money_saved_estimate"],
                action=brief["recommendation_action"],
                action_value=brief["recommendation_action_value"]
            ),
            narrative_summary=narrative,
            narrative_source=source
        )
    except Exception as e:
        logger.error(f"Error compiling weekly summary for {seller_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal server error assembling health brief.")

@router.post("/apply-suggestion", response_model=ApplySuggestionResponse)
async def apply_suggestion(request: ApplySuggestionRequest):
    """
    POST /api/health-brief/apply-suggestion
    Mock endpoint to simulate applying a suggestion.
    """
    logger.info(f"Applying suggestion '{request.action}' for seller '{request.seller_id}'")
    return ApplySuggestionResponse(
        success=True,
        message="Suggestion applied (demo mode)"
    )
