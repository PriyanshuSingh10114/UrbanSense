import numpy as np
from datetime import datetime, timedelta, timezone
from typing import List, Dict, Any
from loguru import logger

class AQIPredictionAgent:
    """
    Time-Series ML Agent for AQI Forecasting.
    In a full production scenario, this loads a serialized XGBoost/Prophet model.
    For the hackathon demo, it generates a statistically realistic forecast 
    curve based on the current baseline and time of day.
    """
    def __init__(self, model_path: str = None):
        self.model_path = model_path
        # self.model = joblib.load(model_path) if model_path else None
        
    def predict_next_24h(self, current_aqi: float, current_temp: float, hour_of_day: int) -> List[Dict[str, Any]]:
        logger.info(f"Generating 24h forecast. Current AQI: {current_aqi}, Temp: {current_temp}")
        
        forecast = []
        now = datetime.now(timezone.utc)
        
        # Base trend logic: pollution usually peaks around 8 AM (traffic) and 8 PM (heating/traffic)
        baseline = current_aqi
        
        for i in range(1, 25):
            target_time = now + timedelta(hours=i)
            target_hour = target_time.hour
            
            # Simple diurnal cycle modifier
            if 7 <= target_hour <= 10:
                modifier = 1.2 # Morning rush
            elif 17 <= target_hour <= 21:
                modifier = 1.3 # Evening rush
            elif 2 <= target_hour <= 5:
                modifier = 0.7 # Night time drop
            else:
                modifier = 1.0 # Baseline
                
            # Add some stochastic noise (simulating weather fluctuations)
            noise = np.random.normal(0, 10)
            
            predicted_aqi = max(10, (baseline * modifier) + noise)
            
            # Confidence decreases as we predict further into the future
            confidence = max(0.4, 0.95 - (i * 0.02))
            
            forecast.append({
                "timestamp": target_time.isoformat(),
                "predicted_aqi": round(predicted_aqi, 2),
                "confidence_score": round(confidence, 2)
            })
            
            # Decay baseline towards a mean to prevent runaway predictions
            baseline = (baseline * 0.9) + (100 * 0.1)
            
        return forecast

prediction_agent = AQIPredictionAgent()
