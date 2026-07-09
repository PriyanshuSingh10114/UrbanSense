import uuid
from sqlalchemy import Column, String, Integer, ForeignKey, Enum, DateTime
from sqlalchemy.dialects.postgresql import UUID
from geoalchemy2 import Geometry
from app.db.base_class import Base
from datetime import datetime, timezone
import enum

class SourceType(str, enum.Enum):
    industry = "industry"
    traffic = "traffic"
    construction = "construction"
    factory = "factory"

class City(Base):
    __tablename__ = "cities"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    name = Column(String, index=True, nullable=False)
    state = Column(String, nullable=False)
    country = Column(String, nullable=False)
    bounding_box = Column(Geometry(geometry_type='POLYGON', srid=4326), nullable=True)
    center_point = Column(Geometry(geometry_type='POINT', srid=4326), nullable=True)

class Ward(Base):
    __tablename__ = "wards"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    city_id = Column(UUID(as_uuid=True), ForeignKey('cities.id', ondelete='CASCADE'), nullable=False)
    name = Column(String, nullable=False)
    boundary = Column(Geometry(geometry_type='POLYGON', srid=4326), nullable=True)

class PollutionSource(Base):
    __tablename__ = "pollution_sources"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    city_id = Column(UUID(as_uuid=True), ForeignKey('cities.id', ondelete='CASCADE'), nullable=False)
    name = Column(String, nullable=False)
    type = Column(Enum(SourceType), nullable=False)
    location = Column(Geometry(geometry_type='POINT', srid=4326), nullable=False)
    risk_level = Column(Integer, default=1)
    registered_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
