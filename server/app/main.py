from typing import Optional, Union
from fastapi import FastAPI , Body, HTTPException
from pydantic import BaseModel
from model import Book
from supabase import Client, create_client


url: str = "https://dxjljeazmxitkuwpbjpg.supabase.co"
key: str = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4amxqZWF6bXhpdGt1d3BianBnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDIzNzA5MDcsImV4cCI6MjAxNzk0NjkwN30.l5kt9VxiOgcafBaXdWKy8CeLHM5mvYQM6wNRK0uu2aU"

def create_supabase_client():
    supabase: Client = create_client(url, key)
    return supabase
# Initialize supabase client
supabase = create_supabase_client()

class UpdateBookStatus(BaseModel):
    status: str

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
# Create a new user
@app.post("/books")
def create_user(book: Book):
    try:
        # Add user to users table
        print(book)
        new_book = supabase.from_("books")\
            .insert({"title": book.title, "status": book.status})\
            .execute()
        
        # Check if user was added
        if new_book:
            return {"message": "User created successfully"}
        else:
            return {"message": "User creation failed"}
    except Exception as e:
        print("Error: ", e)
        return {"message": "User creation failed"}

# Get all books
@app.get("/books")
def get_all_books():
    try:
        books_response = supabase.from_("books").select("*").execute()
        print(books_response)
        if books_response.data:
            books = books_response.data
            return {"books": books}
        else:
            raise HTTPException(status_code=404, detail="Failed to fetch books")
    except Exception as e:
        print("Error: ", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")

# Get a specific book
@app.get("/books/{book_id}")
def get_book(book_id: int):
    try:
        book_response = supabase.from_("books").select("*").eq("id", book_id).execute()
        if book_response.data and len(book_response.data) > 0:
            book = book_response.data[0]  # Fetch the first book found (assuming only one book per ID)
            return {"book": book}
        else:
           return {"message": "Book not found"}
    except Exception as e:
        print("Error: ", e)
        raise HTTPException(status_code=500, detail="Internal Server Error")


# Edit the status of a specific book
@app.put("/books/{book_id}")
def edit_book_status(book_id: int, new_status: dict):
    try:
        updated_status = new_status.get('status')

        if updated_status is None:
            raise HTTPException(status_code=400, detail="Status field not found in the request body")

        updated_book = supabase.from_("books") \
            .update({"status": updated_status}) \
            .eq("id", book_id) \
            .execute()

        if updated_book:
            return {"message": "Book status updated successfully"}
        else:
            return {"message": "Book status update failed"}
    except Exception as e:
        print("Error: ", e)
        return {"message": "Book status update failed"}

# Delete a book
@app.delete("/books/{book_id}")
def delete_book(book_id: int):
    try:
        deleted_book = supabase.from_("books") \
            .delete() \
            .eq("id", book_id) \
            .execute()

        if deleted_book:
            return {"message": "Book deleted successfully"}
        else:
            return {"message": "Book deletion failed"}
    except Exception as e:
        print("Error: ", e)
        return {"message": "Book deletion failed"}