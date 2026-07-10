from google import genai
from app.core.config import settings
from loguru import logger

class CitizenHealthAgent:
    """
    Translates raw environmental metrics into human-readable, contextual health advisories.
    """
    def __init__(self):
        if settings.GEMINI_API_KEY:
            self.client = genai.Client(api_key=settings.GEMINI_API_KEY)
        else:
            self.client = None

    async def generate_advisory(self, aqi: float, weather_condition: str, target_demographic: str = "general public") -> str:
        if not self.client:
            return "Mock Advisory: Air quality is currently poor. Please wear a mask if you are sensitive."

        prompt = f"""
        As a public health official, write a concise, 2-sentence actionable health advisory for the {target_demographic}.
        Current Conditions:
        - AQI (PM2.5): {aqi}
        - Weather: {weather_condition}
        
        Make it sound professional, empathetic, and strictly focused on actionable advice (e.g., closing windows, using purifiers, avoiding outdoor exercise).
        """
        
        try:
            response = self.client.models.generate_content(
                model='gemini-1.5-flash',
                contents=prompt
            )
            return response.text.strip()
        except Exception as e:
            logger.error(f"Gemini API Error during health advisory: {e}")
            return "Unable to generate live health advisory at this time."

health_agent = CitizenHealthAgent()
