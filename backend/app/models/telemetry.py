import uuid
from sqlalchemy import Column, String, Integer, Float, ForeignKey, DateTime, Index
from sqlalchemy.dialects.postgresql import UUID
from app.db.base_class import Base
from datetime import datetime, timezone

class AQIRecord(Base):
    __tablename__ = "aqi_records"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    city_id = Column(UUID(as_uuid=True), ForeignKey('cities.id', ondelete='CASCADE'), nullable=False)
    ward_id = Column(UUID(as_uuid=True), ForeignKey('wards.id', ondelete='CASCADE'), nullable=True)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    pm25 = Column(Float, nullable=True)
    pm10 = Column(Float, nullable=True)
    no2 = Column(Float, nullable=True)
    so2 = Column(Float, nullable=True)
    co = Column(Float, nullable=True)
    o3 = Column(Float, nullable=True)
    aqi_index = Column(Integer, nullable=False)

    __table_args__ = (
        Index('idx_aqi_records_timestamp', 'timestamp'),
        Index('idx_aqi_records_city_timestamp', 'city_id', 'timestamp'),
    )

class WeatherRecord(Base):
    __tablename__ = "weather_records"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    city_id = Column(UUID(as_uuid=True), ForeignKey('cities.id', ondelete='CASCADE'), nullable=False)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    temperature = Column(Float, nullable=True) # Celsius
    humidity = Column(Float, nullable=True) # Percentage
    wind_speed = Column(Float, nullable=True) # m/s
    wind_direction = Column(Float, nullable=True) # degrees
    condition = Column(String, nullable=True) # e.g. "Clear", "Rain"

    __table_args__ = (
        Index('idx_weather_records_timestamp', 'timestamp'),
    )

class TrafficData(Base):
    __tablename__ = "traffic_data"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    ward_id = Column(UUID(as_uuid=True), ForeignKey('wards.id', ondelete='CASCADE'), nullable=False)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    congestion_level = Column(Float, nullable=False) # 0.0 to 1.0
    average_speed = Column(Float, nullable=True) # km/h
