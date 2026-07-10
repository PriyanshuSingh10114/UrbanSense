import uuid
import enum
from sqlalchemy import Column, String, ForeignKey, DateTime, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from app.db.base_class import Base
from datetime import datetime, timezone

class AlertSeverity(str, enum.Enum):
    info = "info"
    warning = "warning"
    danger = "danger"

class Alert(Base):
    __tablename__ = "alerts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    city_id = Column(UUID(as_uuid=True), ForeignKey('cities.id', ondelete='CASCADE'), nullable=False)
    timestamp = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    severity = Column(Enum(AlertSeverity), nullable=False, default=AlertSeverity.info)
    source = Column(String, nullable=True) # e.g. "AI System", "Sensor Node X"
    status = Column(String, default="active") # "active", "resolved"
    metadata_json = Column(JSON, nullable=True) # Any additional context
