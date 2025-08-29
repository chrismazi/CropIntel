from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.database import engine, Base
from app.models import user  # Import models
from app.api.v1 import auth, llm_chat, crop, pest_disease

# Create FastAPI app instance
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Create the database tables
Base.metadata.create_all(bind=engine)

# Include the auth router
app.include_router(auth.router)
app.include_router(llm_chat.router, prefix="/llm-chat", tags=["LLM Chat"])
app.router.include_router(crop.router, prefix="/crop", tags=["crop"])
# Include pest and disease detection routes
app.include_router(pest_disease.router, prefix="/api/v1/pest_disease")

# Simple route for testing
@app.get("/")
def read_root():
    return {"message": "Hello, CropIntel!"}
