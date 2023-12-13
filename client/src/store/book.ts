import { create } from "zustand";

type BookStore = {
  books: Book[];
  addBook: (newBook: Book) => void;
  removeBook: (id: number) => void;
  updateBook: (id: number, updatedBook: Partial<Book>) => void;
  addBooks: (newBooks: Book[]) => void;
};

const useBookStore = create<BookStore>((set) => ({
  books: [],
  addBook: (newBook: Book) =>
    set((state) => ({ books: [...state.books, newBook] })),
  removeBook: (id: number) =>
    set((state) => ({ books: state.books.filter((book) => book.id !== id) })),
  updateBook: (id: number, updatedBook: Partial<Book>) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id ? { ...book, ...updatedBook } : book
      ),
    })),
  addBooks: (newBooks: Book[]) => {
    set((state) => {
      const existingBookIds = new Set(state.books.map((book) => book.id));

      const uniqueNewBooks = newBooks.filter(
        (book) => !existingBookIds.has(book.id)
      );

      return { books: [...state.books, ...uniqueNewBooks] };
    });
  },
}));

export default useBookStore;
