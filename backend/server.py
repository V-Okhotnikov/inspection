from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from pydantic import BaseModel, Field
from typing import List, Optional
import os
import logging
from datetime import datetime, timezone
import uuid
import uvicorn

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://inspectionrbi.netlify.app",  # ваш Netlify URL
        "http://localhost:3000",  # для локальной разработки
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Настройка логирования
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Временное хранилище данных
status_checks_storage = []

# Модели данных
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "active"

class StatusCheckCreate(BaseModel):
    client_name: str
    status: Optional[str] = "active"

class HealthResponse(BaseModel):
    status: str
    service: str
    timestamp: datetime
    version: str = "1.0.0"

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("🚀 Starting Inspection Backend Service")
    logger.info(f"📍 Port: {os.environ.get('PORT', 8000)}")
    
    yield
    
    # Shutdown
    logger.info("🛑 Shutting down Inspection Backend Service")

# Создание приложения
app = FastAPI(
    title="Inspection Backend API",
    description="Backend service for inspection application",
    version="1.0.0",
    lifespan=lifespan
)

# Роутер для API
api_router = APIRouter(prefix="/api")

@api_router.get("/", response_model=dict)
async def root():
    """Корневой эндпоинт API"""
    return {
        "message": "Welcome to Inspection Backend API",
        "status": "operational",
        "version": "1.0.0",
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

@api_router.get("/health", response_model=HealthResponse)
async def health_check():
    """Проверка здоровья сервиса"""
    return HealthResponse(
        status="healthy",
        service="inspection-backend",
        timestamp=datetime.now(timezone.utc)
    )

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(status_data: StatusCheckCreate):
    """Создание новой проверки статуса"""
    try:
        status_check = StatusCheck(
            client_name=status_data.client_name,
            status=status_data.status
        )
        
        # Сохраняем во временное хранилище
        status_checks_storage.append(status_check)
        logger.info(f"✅ Status check created for client: {status_data.client_name}")
        
        return status_check
        
    except Exception as e:
        logger.error(f"❌ Error creating status check: {e}")
        raise HTTPException(status_code=500, detail="Internal server error")

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    """Получение всех проверок статуса"""
    return status_checks_storage

@api_router.get("/status/{status_id}", response_model=StatusCheck)
async def get_status_check(status_id: str):
    """Получение конкретной проверки статуса по ID"""
    for check in status_checks_storage:
        if check.id == status_id:
            return check
    raise HTTPException(status_code=404, detail="Status check not found")

# Подключаем роутер к приложению
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить все домены для теста
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Запуск сервера для Render
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    logger.info(f"🎯 Starting server on 0.0.0.0:{port}")
    
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=port,
        reload=False,
        access_log=True,
        log_level="info"
    )


