from typing import List, Optional
from supabase import Client
from models.book import Book

class BookRepository:
    
    def __init__(self, supabase: Client):
        self.supabase = supabase

    def create_book(self, book: Book) -> Optional[Book]:
        print(book.title)
        new_book = self.supabase.from_("books") \
            .insert({"title": book.title, "status": book.status}) \
            .execute()
        
        if new_book and new_book.data:
            created_book = new_book.data[0]
            return Book(id=created_book["id"], title=created_book["title"], status=created_book["status"])
        return None

    def get_all_books(self) -> List[Book]:
        books_response = self.supabase.from_("books").select("*").execute()
        
        if books_response and books_response.data and len(books_response.data) > 0:
            books = []
            for book_data in books_response.data:
                books.append(Book(id=book_data["id"], title=book_data["title"], status=book_data["status"]))
            return books
        return []

    def update_book_status(self, book_id: int, new_status: str) -> bool:
        updated_book = self.supabase.from_("books") \
            .update({"status": new_status}) \
            .eq("id", book_id) \
            .execute()

        return bool(updated_book and updated_book.data)

    def delete_book(self, book_id: int) -> bool:
        deleted_book = self.supabase.from_("books") \
            .delete() \
            .eq("id", book_id) \
            .execute()

        return bool(deleted_book and deleted_book.data)
