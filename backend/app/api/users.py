from typing import Annotated, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.db.session import get_db
from app.api.deps import get_current_active_user, get_current_active_superuser
from app.models.user import User
from app.schemas.user import UserResponse, UserUpdate
from app.core.security import get_password_hash

router = APIRouter()

@router.get("/me", response_model=UserResponse)
async def read_user_me(
    current_user: Annotated[User, Depends(get_current_active_user)]
) -> User:
    """Get current user."""
    return current_user

@router.patch("/me", response_model=UserResponse)
async def update_user_me(
    *,
    db: Annotated[AsyncSession, Depends(get_db)],
    user_in: UserUpdate,
    current_user: Annotated[User, Depends(get_current_active_user)]
) -> User:
    """Update own user."""
    if user_in.password is not None:
        current_user.password_hash = get_password_hash(user_in.password)
    if user_in.full_name is not None:
        current_user.full_name = user_in.full_name
    if user_in.email is not None:
        # Check if email is already taken
        result = await db.execute(select(User).where(User.email == user_in.email))
        existing_user = result.scalars().first()
        if existing_user and existing_user.id != current_user.id:
            raise HTTPException(status_code=400, detail="Email already taken")
        current_user.email = user_in.email
    
    db.add(current_user)
    await db.commit()
    await db.refresh(current_user)
    return current_user

@router.get("/", response_model=List[UserResponse])
async def read_users(
    db: Annotated[AsyncSession, Depends(get_db)],
    current_user: Annotated[User, Depends(get_current_active_superuser)],
    skip: int = 0,
    limit: int = 100,
) -> List[User]:
    """Retrieve users (Admin only)."""
    result = await db.execute(select(User).offset(skip).limit(limit))
    return result.scalars().all()
