import React, { FC } from "react";
import { CardDemo } from "./CardDemo";
import useBookStore from "@/store/book";

interface CustomComponentProps {
  title: string;
  books: Book[];
}

const CustomComponent: FC<CustomComponentProps> = ({ title, books }) => {
  const removeBook = useBookStore((state) => state.removeBook);
  const updateBook = useBookStore((state) => state.updateBook);
  const handleStatusChange = async (bookId: number, newStatus: string) => {
    const formData = {
      status: newStatus,
    };
    const res = await fetch(`/api/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const content = await res.json();
    updateBook(bookId, { status: newStatus });
  };

  const removeBooks = async (id: number) => {
    const res = await fetch(`/api/books/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const content = await res.json();
    removeBook(id);
  };

  console.log(books);
  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-white-600 h-[550px]">
      <div className="h-20  bg-white rounded-lg shadow-md border-2 border-white-600 flex justify-center items-center">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className=" max-h-[450px] overflow-y-auto overflow-x-hidden   mb-0 p-2 flex flex-col items-center ">
        {books?.map((book, index) => (
          <CardDemo
            key={index}
            book={book}
            handleStatusChange={handleStatusChange}
            removeBook={removeBooks}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomComponent;
