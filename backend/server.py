from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
import logging
from pathlib import Path
import uvicorn

ROOT_DIR = Path(__file__).parent

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 Starting FastAPI server on Render")
    yield
    # Shutdown
    print("🛑 Shutting down FastAPI server")

app = FastAPI(lifespan=lifespan)

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World from Render!", "status": "success"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "inspection-backend"}

@api_router.get("/test")
async def test_endpoint():
    return {"test": "ok", "timestamp": "2024-10-09T00:00:00Z"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Важно: Запуск сервера для Render
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    print(f"Starting server on port {port}")
    uvicorn.run(
        "server:app",
        host="0.0.0.0",
        port=port,
        reload=False,  # False для продакшена
        access_log=True
    )
