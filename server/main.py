from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.book_endpoints import BookEndpoints
from repository.book_repository import BookRepository
from database.db_connection import DatabaseConnection
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = FastAPI()

# Setup cors
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Retrieve URL and key from environment variables
supabase_url = os.getenv("URL")
supabase_key = os.getenv("KEY")

db_connection = DatabaseConnection(url=supabase_url, key=supabase_key)
db_connection.connect()
supabase_client = db_connection.supabase

book_repository = BookRepository(supabase_client)
book_endpoints = BookEndpoints(book_repository)

app.include_router(book_endpoints.router, prefix="/books")
