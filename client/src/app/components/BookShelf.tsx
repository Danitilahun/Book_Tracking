import useBookStore from "@/store/book";
import BookList from "./BookList";

const BookShelf = () => {
  const { books } = useBookStore((state) => ({
    books: state.books,
  }));

  const filterBooksByStatus = (status: string): Book[] => {
    return (books ?? []).filter((book: Book) => book?.status === status);
  };

  return (
    <div className="flex flex-col h-5/6 sm:h-3/4 md:h-5/6 py-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full">
        <BookList title="To-Read" books={filterBooksByStatus("To-Read")} />
        <BookList
          title="In-Progress"
          books={filterBooksByStatus("In-Progress")}
        />
        <BookList title="Completed" books={filterBooksByStatus("Completed")} />
      </div>
    </div>
  );
};

export default BookShelf;
