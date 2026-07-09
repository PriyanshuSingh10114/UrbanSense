import asyncio
import uuid
import random
from datetime import datetime, timedelta, timezone
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import AsyncSessionLocal, engine
from app.models.geospatial import City, Ward, PollutionSource, SourceType
from app.models.telemetry import AQIRecord, WeatherRecord, TrafficData
from loguru import logger

async def seed_database():
    async with AsyncSessionLocal() as session:
        # Check if already seeded
        # (Assuming tables are created either by Alembic or Base.metadata.create_all)
        
        # 1. Create a City
        city_id = uuid.uuid4()
        # In WKT, POINT(lon lat)
        city = City(
            id=city_id,
            name="Neo-Mumbai",
            state="Maharashtra",
            country="India",
            center_point="POINT(72.8777 19.0760)"
        )
        session.add(city)
        
        # 2. Create Wards
        ward_id = uuid.uuid4()
        ward = Ward(
            id=ward_id,
            city_id=city_id,
            name="Industrial Zone Andheri",
        )
        session.add(ward)
        
        # 3. Create Pollution Source
        source = PollutionSource(
            city_id=city_id,
            name="Andheri Cement Factory",
            type=SourceType.factory,
            location="POINT(72.8600 19.1100)",
            risk_level=4
        )
        session.add(source)
        
        # 4. Generate 24 hours of mock telemetry data
        now = datetime.now(timezone.utc)
        for i in range(24):
            t = now - timedelta(hours=i)
            
            # AQI
            aqi_val = random.randint(50, 200)
            aqi = AQIRecord(
                city_id=city_id,
                ward_id=ward_id,
                timestamp=t,
                pm25=aqi_val * 0.4,
                pm10=aqi_val * 0.7,
                aqi_index=aqi_val
            )
            session.add(aqi)
            
            # Weather
            weather = WeatherRecord(
                city_id=city_id,
                timestamp=t,
                temperature=25.0 + random.uniform(-2, 2),
                humidity=60.0 + random.uniform(-10, 10),
                wind_speed=random.uniform(0, 10),
                wind_direction=random.uniform(0, 360),
                condition="Clear" if random.random() > 0.2 else "Cloudy"
            )
            session.add(weather)
            
            # Traffic
            traffic = TrafficData(
                ward_id=ward_id,
                timestamp=t,
                congestion_level=random.uniform(0.1, 0.9),
                average_speed=random.uniform(10, 60)
            )
            session.add(traffic)
            
        await session.commit()
        logger.info("Successfully seeded database with Neo-Mumbai mock data.")

async def main():
    logger.info("Starting database seeder...")
    # Create tables if they don't exist (useful for dev/hackathon)
    from app.db.base_class import Base
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        
    await seed_database()
    logger.info("Seeding complete.")

if __name__ == "__main__":
    asyncio.run(main())
