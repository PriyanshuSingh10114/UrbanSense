from fastapi import APIRouter
from typing import List, Dict, Any
from app.ai.prediction_agent import prediction_agent
from app.ai.attribution_agent import attribution_agent
from app.ai.health_agent import health_agent

router = APIRouter()

@router.get("/predict", response_model=List[Dict[str, Any]])
async def predict_aqi(current_aqi: float = 100.0, current_temp: float = 25.0, current_hour: int = 12):
    """Generate 24-hour hyperlocal AQI prediction."""
    return prediction_agent.predict_next_24h(current_aqi, current_temp, current_hour)

@router.post("/attribute")
async def attribute_pollution(aqi_value: float, wind_direction: float, wind_speed: float, nearby_sources: List[Dict[str, Any]]):
    """Use Gemini AI to deduce the most probable source of an AQI spike."""
    return await attribution_agent.analyze_spike(aqi_value, wind_direction, wind_speed, nearby_sources)

@router.get("/advisory")
async def get_health_advisory(aqi: float, weather_condition: str = "Clear", target_demographic: str = "general public"):
    """Generate localized, contextual citizen health advisories."""
    advisory = await health_agent.generate_advisory(aqi, weather_condition, target_demographic)
    return {"advisory": advisory}
