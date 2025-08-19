from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime, timezone
from enum import Enum


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="AutoCommerce API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Enums
class VehicleType(str, Enum):
    CAR = "car"
    SUV = "suv"
    MOTORCYCLE = "motorcycle"
    TRUCK = "truck"
    VAN = "van"

class FuelType(str, Enum):
    GASOLINE = "gasoline"
    DIESEL = "diesel"
    ELECTRIC = "electric"
    HYBRID = "hybrid"
    FLEX = "flex"

class Transmission(str, Enum):
    MANUAL = "manual"
    AUTOMATIC = "automatic"
    CVT = "cvt"

class VehicleCondition(str, Enum):
    NEW = "new"
    USED = "used"
    CERTIFIED = "certified"


# Vehicle Models
class Vehicle(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    brand: str
    model: str
    year: int
    price: float
    mileage: int
    vehicle_type: VehicleType
    fuel_type: FuelType
    transmission: Transmission
    condition: VehicleCondition
    color: str
    description: str
    location: str
    seller_name: str
    seller_phone: str
    seller_email: str
    images: List[str] = []
    features: List[str] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_featured: bool = False
    is_sold: bool = False

class VehicleCreate(BaseModel):
    title: str
    brand: str
    model: str
    year: int
    price: float
    mileage: int
    vehicle_type: VehicleType
    fuel_type: FuelType
    transmission: Transmission
    condition: VehicleCondition
    color: str
    description: str
    location: str
    seller_name: str
    seller_phone: str
    seller_email: str
    images: List[str] = []
    features: List[str] = []

class VehicleUpdate(BaseModel):
    title: Optional[str] = None
    price: Optional[float] = None
    mileage: Optional[int] = None
    description: Optional[str] = None
    location: Optional[str] = None
    seller_phone: Optional[str] = None
    seller_email: Optional[str] = None
    images: Optional[List[str]] = None
    features: Optional[List[str]] = None
    is_featured: Optional[bool] = None
    is_sold: Optional[bool] = None

# User Models
class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    location: str
    favorites: List[str] = []
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class UserCreate(BaseModel):
    name: str
    email: str
    phone: str
    location: str


# Helper functions
def prepare_for_mongo(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, datetime):
                data[key] = value.isoformat()
    return data

def parse_from_mongo(item):
    if isinstance(item, dict):
        for key, value in item.items():
            if isinstance(value, str) and key in ['created_at', 'updated_at']:
                try:
                    item[key] = datetime.fromisoformat(value)
                except:
                    pass
    return item


# Routes
@api_router.get("/")
async def root():
    return {"message": "AutoCommerce API - Vehicle Marketplace"}

# Vehicle Routes
@api_router.post("/vehicles", response_model=Vehicle)
async def create_vehicle(vehicle: VehicleCreate):
    vehicle_dict = vehicle.dict()
    vehicle_obj = Vehicle(**vehicle_dict)
    vehicle_data = prepare_for_mongo(vehicle_obj.dict())
    await db.vehicles.insert_one(vehicle_data)
    return vehicle_obj

@api_router.get("/vehicles", response_model=List[Vehicle])
async def get_vehicles(
    skip: int = 0,
    limit: int = 20,
    brand: Optional[str] = None,
    vehicle_type: Optional[VehicleType] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    min_year: Optional[int] = None,
    max_year: Optional[int] = None,
    condition: Optional[VehicleCondition] = None,
    search: Optional[str] = None
):
    # Build filter query
    filter_query = {"is_sold": False}
    
    if brand:
        filter_query["brand"] = {"$regex": brand, "$options": "i"}
    if vehicle_type:
        filter_query["vehicle_type"] = vehicle_type
    if min_price is not None:
        filter_query["price"] = {"$gte": min_price}
    if max_price is not None:
        if "price" in filter_query:
            filter_query["price"]["$lte"] = max_price
        else:
            filter_query["price"] = {"$lte": max_price}
    if min_year:
        filter_query["year"] = {"$gte": min_year}
    if max_year:
        if "year" in filter_query:
            filter_query["year"]["$lte"] = max_year
        else:
            filter_query["year"] = {"$lte": max_year}
    if condition:
        filter_query["condition"] = condition
    if search:
        filter_query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"brand": {"$regex": search, "$options": "i"}},
            {"model": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    vehicles = await db.vehicles.find(filter_query).skip(skip).limit(limit).to_list(limit)
    return [Vehicle(**parse_from_mongo(vehicle)) for vehicle in vehicles]

@api_router.get("/vehicles/featured", response_model=List[Vehicle])
async def get_featured_vehicles(limit: int = 6):
    vehicles = await db.vehicles.find({"is_featured": True, "is_sold": False}).limit(limit).to_list(limit)
    return [Vehicle(**parse_from_mongo(vehicle)) for vehicle in vehicles]

@api_router.get("/vehicles/{vehicle_id}", response_model=Vehicle)
async def get_vehicle(vehicle_id: str):
    vehicle = await db.vehicles.find_one({"id": vehicle_id})
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return Vehicle(**parse_from_mongo(vehicle))

@api_router.put("/vehicles/{vehicle_id}", response_model=Vehicle)
async def update_vehicle(vehicle_id: str, vehicle_update: VehicleUpdate):
    update_data = {k: v for k, v in vehicle_update.dict().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc)
    update_data = prepare_for_mongo(update_data)
    
    result = await db.vehicles.update_one(
        {"id": vehicle_id},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    updated_vehicle = await db.vehicles.find_one({"id": vehicle_id})
    return Vehicle(**parse_from_mongo(updated_vehicle))

@api_router.delete("/vehicles/{vehicle_id}")
async def delete_vehicle(vehicle_id: str):
    result = await db.vehicles.delete_one({"id": vehicle_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return {"message": "Vehicle deleted successfully"}

# User Routes
@api_router.post("/users", response_model=User)
async def create_user(user: UserCreate):
    # Check if user already exists
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    
    user_dict = user.dict()
    user_obj = User(**user_dict)
    user_data = prepare_for_mongo(user_obj.dict())
    await db.users.insert_one(user_data)
    return user_obj

@api_router.get("/users/{user_id}", response_model=User)
async def get_user(user_id: str):
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return User(**parse_from_mongo(user))

# Favorites
@api_router.post("/users/{user_id}/favorites/{vehicle_id}")
async def add_to_favorites(user_id: str, vehicle_id: str):
    # Check if vehicle exists
    vehicle = await db.vehicles.find_one({"id": vehicle_id})
    if not vehicle:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    
    # Add to favorites
    await db.users.update_one(
        {"id": user_id},
        {"$addToSet": {"favorites": vehicle_id}}
    )
    return {"message": "Vehicle added to favorites"}

@api_router.delete("/users/{user_id}/favorites/{vehicle_id}")
async def remove_from_favorites(user_id: str, vehicle_id: str):
    await db.users.update_one(
        {"id": user_id},
        {"$pull": {"favorites": vehicle_id}}
    )
    return {"message": "Vehicle removed from favorites"}

@api_router.get("/users/{user_id}/favorites", response_model=List[Vehicle])
async def get_user_favorites(user_id: str):
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    favorite_ids = user.get("favorites", [])
    vehicles = await db.vehicles.find({"id": {"$in": favorite_ids}}).to_list(None)
    return [Vehicle(**parse_from_mongo(vehicle)) for vehicle in vehicles]

# Statistics
@api_router.get("/stats")
async def get_stats():
    total_vehicles = await db.vehicles.count_documents({})
    available_vehicles = await db.vehicles.count_documents({"is_sold": False})
    sold_vehicles = await db.vehicles.count_documents({"is_sold": True})
    total_users = await db.users.count_documents({})
    
    return {
        "total_vehicles": total_vehicles,
        "available_vehicles": available_vehicles,
        "sold_vehicles": sold_vehicles,
        "total_users": total_users
    }

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()