import asyncio
from abc import ABC, abstractmethod
from typing import List, Dict, Any
from loguru import logger
from app.core.celery_app import celery_app

class DataIngestor(ABC):
    """Abstract interface for multi-source data ingestion."""
    
    @abstractmethod
    async def fetch_data(self, **kwargs) -> List[Dict[str, Any]]:
        """Fetch raw data from external API (OpenAQ, OpenWeather, etc.)."""
        pass
    
    @abstractmethod
    async def normalize(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Normalize raw vendor data into standard UrbanSense schema."""
        pass

class MockAQIIngestor(DataIngestor):
    async def fetch_data(self, city_name: str) -> List[Dict[str, Any]]:
        # Simulate network latency to OpenAQ API
        await asyncio.sleep(0.5)
        logger.info(f"Fetched mock AQI data for {city_name}")
        return [{"city": city_name, "pm25": 55.4, "pm10": 90.2, "aqi": 140, "o3": 20.1}]
        
    async def normalize(self, raw_data: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        return raw_data

@celery_app.task(name="app.services.ingestion.scheduled_aqi_fetch")
def scheduled_aqi_fetch_task(city_name: str = "Metropolis"):
    """
    Periodic Celery task to fetch latest AQI data.
    Runs synchronously, wraps async logic.
    """
    ingestor = MockAQIIngestor()
    # For Celery async wrapping
    loop = asyncio.get_event_loop()
    raw = loop.run_until_complete(ingestor.fetch_data(city_name))
    normalized = loop.run_until_complete(ingestor.normalize(raw))
    
    # Normally, we would get an async DB session and insert here.
    logger.info(f"Successfully processed {len(normalized)} AQI records.")
    return {"status": "success", "inserted": len(normalized)}
