from fastapi import APIRouter, HTTPException
from models.book import Book
from repository.book_repository import BookRepository

class BookEndpoints:
    def __init__(self, book_repo: BookRepository):
        self.router = APIRouter()
        self.book_repo = book_repo
        self.setup_routes()

    def setup_routes(self):
        
        @self.router.post("/", status_code=201)
        def create_book(book: Book):
            created_book = self.book_repo.create_book(book)
            if created_book:
                return created_book
            raise HTTPException(status_code=500, detail="Failed to create book")

        @self.router.get("/", response_model=list[Book])
        def get_all_books():
            return self.book_repo.get_all_books()

        @self.router.put("/{book_id}")
        def update_book_status(book_id: int, book: Book):
            updated = self.book_repo.update_book_status(book_id, book.status)
            if updated:
                return {"message": "Book status updated successfully"}
            raise HTTPException(status_code=404, detail="Book not found")

        @self.router.delete("/{book_id}")
        def delete_book(book_id: int):
            deleted = self.book_repo.delete_book(book_id)
            if deleted:
                return {"message": "Book deleted successfully"}
            raise HTTPException(status_code=404, detail="Book not found")
