import React, { FC } from "react";
import BookCard from "./BookCard";

interface BookListProps {
  title: string;
  books: Book[];
}

const BookList: FC<BookListProps> = ({ title, books }) => {
  return (
    <section className="bg-white rounded-lg shadow-md border-2 border-white-600 h-[550px]">
      <header className="h-18 bg-white rounded-lg shadow-md border-2 border-white-600 flex justify-center items-center p-3">
        <h1 className="text-xl font-bold">{title}</h1>
      </header>
      <div className="max-h-[464px] overflow-y-auto overflow-x-hidden p-3">
        {books?.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </section>
  );
};

export default BookList;
