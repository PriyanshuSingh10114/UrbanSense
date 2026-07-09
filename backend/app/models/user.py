import uuid
from sqlalchemy import Column, String, Boolean, DateTime, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime, timezone
from app.db.base_class import Base
import enum

class UserRole(str, enum.Enum):
    admin = "admin"
    officer = "officer"
    citizen = "citizen"

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    role = Column(Enum(UserRole), default=UserRole.citizen, nullable=False)
    is_active = Column(Boolean(), default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
