from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "UrbanSense"
    API_V1_STR: str = "/api/v1"
    
    # Security
    SECRET_KEY: str = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://urbansense:urbansense_password@localhost:5432/urbansense_db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # APIs
    GEMINI_API_KEY: str = ""

    class Config:
        env_file = ".env"

settings = Settings()
