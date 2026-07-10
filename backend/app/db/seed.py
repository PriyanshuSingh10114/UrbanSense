import asyncio
import uuid
import random
from datetime import datetime, timedelta, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import AsyncSessionLocal, engine
from app.models.geospatial import City, Ward, PollutionSource, SourceType, POI, POIType
from app.models.telemetry import AQIRecord, WeatherRecord, TrafficData
from app.models.intelligence import Alert, AlertSeverity
from loguru import logger

# 5 Major Metropolitan Nodes with coordinates and base AQI levels
CITY_CONFIG = [
    {"id": "delhi", "name": "New Delhi", "lat": 28.6139, "lng": 77.2090, "base_aqi": 300},
    {"id": "mumbai", "name": "Mumbai", "lat": 19.0760, "lng": 72.8777, "base_aqi": 150},
    {"id": "bangalore", "name": "Bangalore", "lat": 12.9716, "lng": 77.5946, "base_aqi": 80},
    {"id": "chennai", "name": "Chennai", "lat": 13.0827, "lng": 80.2707, "base_aqi": 90},
    {"id": "kolkata", "name": "Kolkata", "lat": 22.5726, "lng": 88.3639, "base_aqi": 200},
]

def generate_random_point_near(lat, lng, offset=0.05):
    return f"POINT({lng + random.uniform(-offset, offset)} {lat + random.uniform(-offset, offset)})"

async def seed_database():
    async with AsyncSessionLocal() as session:
        # Check if already seeded to prevent duplicate data
        result = await session.execute(select(City))
        existing_cities = result.scalars().all()
        if existing_cities:
            logger.info("Database already seeded. Skipping...")
            return

        now = datetime.now(timezone.utc)

        for cfg in CITY_CONFIG:
            city_id = uuid.uuid4()
            city = City(
                id=city_id,
                name=cfg["name"],
                state="State", # Mock state
                country="India",
                center_point=f"POINT({cfg['lng']} {cfg['lat']})"
            )
            session.add(city)

            # Generate Wards
            ward_id = uuid.uuid4()
            ward = Ward(
                id=ward_id,
                city_id=city_id,
                name=f"Central {cfg['name']} Sector"
            )
            session.add(ward)

            # Generate Pollution Sources
            session.add(PollutionSource(
                city_id=city_id,
                name=f"Heavy Industry Zone A",
                type=SourceType.industry,
                location=generate_random_point_near(cfg['lat'], cfg['lng']),
                risk_level=random.randint(2, 5)
            ))

            # Generate POIs (Hospitals, Schools)
            session.add(POI(
                city_id=city_id,
                name=f"City General Hospital",
                type=POIType.hospital,
                location=generate_random_point_near(cfg['lat'], cfg['lng'])
            ))
            session.add(POI(
                city_id=city_id,
                name=f"Public High School",
                type=POIType.school,
                location=generate_random_point_near(cfg['lat'], cfg['lng'])
            ))

            # Generate Active Alert if AQI is high
            if cfg["base_aqi"] > 150:
                session.add(Alert(
                    city_id=city_id,
                    title="Critical Air Quality Alert",
                    description=f"AI predicts sustained dangerous particulate levels in {cfg['name']}.",
                    severity=AlertSeverity.danger if cfg["base_aqi"] > 250 else AlertSeverity.warning,
                    source="Gemini Intelligence",
                    status="active"
                ))

            # Generate 24 hours of telemetry
            for i in range(24):
                t = now - timedelta(hours=i)
                
                # Introduce diurnal variation to AQI
                variation = random.uniform(0.8, 1.2)
                aqi_val = int(cfg["base_aqi"] * variation)

                session.add(AQIRecord(
                    city_id=city_id,
                    ward_id=ward_id,
                    timestamp=t,
                    pm25=aqi_val * 0.45,
                    pm10=aqi_val * 0.75,
                    no2=aqi_val * 0.2,
                    co=aqi_val * 0.1,
                    so2=aqi_val * 0.05,
                    aqi_index=aqi_val
                ))

                session.add(WeatherRecord(
                    city_id=city_id,
                    timestamp=t,
                    temperature=28.0 + random.uniform(-5, 5),
                    humidity=60.0 + random.uniform(-15, 15),
                    wind_speed=random.uniform(2, 12),
                    wind_direction=random.uniform(0, 360),
                    condition=random.choice(["Clear", "Cloudy", "Haze"])
                ))

                session.add(TrafficData(
                    ward_id=ward_id,
                    timestamp=t,
                    congestion_level=random.uniform(0.2, 0.9),
                    average_speed=random.uniform(15, 45)
                ))

        await session.commit()
        logger.info("Successfully seeded database with Country-Level mock data.")

async def main():
    logger.info("Starting database seeder...")
    # Create tables
    from app.db.base_class import Base
    import app.models # ensure models are registered
    async with engine.begin() as conn:
        # Drop all tables to ensure fresh schema for the new models
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
        
    await seed_database()
    logger.info("Seeding complete.")

if __name__ == "__main__":
    asyncio.run(main())
