import React, { FC } from "react";
import BookCard from "./BookCard";

interface BookListProps {
  title: string;
  books: Book[];
}

const BookList: FC<BookListProps> = ({ title, books }) => {
  return (
    <section className="bg-white rounded-lg shadow-md border-2 border-white-600 h-[550px]">
      <header className="h-20 bg-white rounded-lg shadow-md border-2 border-white-600 flex justify-center items-center">
        <h1 className="text-xl font-bold">{title}</h1>
      </header>
      <div className="max-h-[450px] overflow-y-auto overflow-x-hidden p-2">
        {books?.map((book, index) => (
          <BookCard key={index} book={book} />
        ))}
      </div>
    </section>
  );
};

export default BookList;
