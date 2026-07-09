import google.generativeai as genai
from typing import Dict, Any, List
from app.core.config import settings
from loguru import logger
import json

class PollutionAttributionAgent:
    """
    Agent responsible for deducing the root cause of localized AQI spikes 
    using geospatial heuristics and the Gemini API.
    """
    def __init__(self):
        if settings.GEMINI_API_KEY:
            genai.configure(api_key=settings.GEMINI_API_KEY)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            logger.warning("GEMINI_API_KEY not set. Attribution will run in mock mode.")
            self.model = None

    async def analyze_spike(self, aqi_value: float, wind_direction: float, wind_speed: float, nearby_sources: List[Dict[str, str]]) -> Dict[str, Any]:
        """
        Analyzes the given data to attribute the spike to a source.
        nearby_sources format: [{"id": "uuid", "name": "Factory X", "type": "industry", "distance_km": 1.2, "bearing": 45.0}]
        """
        if not self.model:
            # Fallback mock for local development without API key
            return {
                "attributed_source_id": nearby_sources[0]["id"] if nearby_sources else None,
                "confidence": 0.85,
                "reasoning": "Mock reasoning: Wind is blowing directly from the factory towards the sensor."
            }
            
        prompt = f"""
        You are an expert environmental data analyst for a smart city platform.
        An anomalous AQI spike of {aqi_value} PM2.5 was just detected.
        Current meteorological conditions:
        - Wind Speed: {wind_speed} m/s
        - Wind Direction (from where the wind originates): {wind_direction} degrees (0 is North, 90 is East)
        
        Nearby registered pollution sources:
        {json.dumps(nearby_sources, indent=2)}
        
        Given that wind transports particulate matter from the source to the sensor, calculate which of the nearby sources is the most likely culprit based on their bearing relative to the sensor and the wind direction.
        
        Respond ONLY with a raw JSON object (no markdown, no backticks) with the following exact keys:
        - "attributed_source_id": The UUID of the most likely source (or null if none fit).
        - "confidence": A float between 0.0 and 1.0 representing your confidence.
        - "reasoning": A 2-sentence explanation of why you chose this source.
        """
        
        try:
            response = self.model.generate_content(prompt)
            # Clean potential markdown from response
            raw_text = response.text.strip().removeprefix('```json').removesuffix('```').strip()
            return json.loads(raw_text)
        except Exception as e:
            logger.error(f"Gemini API Error during attribution: {e}")
            return {
                "attributed_source_id": None,
                "confidence": 0.0,
                "reasoning": f"Failed to perform AI attribution due to an internal error: {str(e)}"
            }

attribution_agent = PollutionAttributionAgent()
