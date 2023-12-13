"use client";
import { useState } from "react";
import CustomComponent from "./components/CustomComponent";
import { ProfileForm } from "./components/ProfileForm";
import useSWR from "swr";
import { fetcher } from "@/lib";

export default function Home() {
  const { data, error, isLoading } = useSWR<any>(`/api/books`, fetcher);
  console.log(data, error, isLoading);
  const initialBooks: Book[] = data?.result?.books || []; // Provide a default value if data.result.books is undefined
  console.log(initialBooks);
  const [books, setBooks] = useState<Book[]>(initialBooks);

  const handleStatusChange = async (bookId: Number, newStatus: string) => {
    const updatedBooks = books?.map((book) =>
      book.id === bookId ? { ...book, status: newStatus } : book
    );

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
    console.log(content);
    setBooks(updatedBooks);
  };

  // Filter books based on their status
  const toReadBooks = books?.filter((book) => book.status === "To-Read");
  const inProgressBooks = books?.filter(
    (book) => book.status === "In-Progress"
  );
  const completedBooks = books?.filter((book) => book.status === "Completed");

  const addBook = async (title: string) => {
    const newBook: Book = {
      id: books.length + 1, // Generate ID based on array length
      title,
      status: "To-Read",
    };

    const { id, ...newFormData } = newBook;

    const add = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFormData),
    });
    const content = await add.json();
    console.log(content);
    setBooks([...books, newBook]); // Add the new book to the books array
  };

  const removeBook = async (id: number) => {
    const updatedBooks = books.filter((book) => book.id !== id); // Filter out the book to be deleted
    const res = await fetch(`/api/books/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const content = await res.json();
    console.log(content);
    setBooks(updatedBooks); // Update state with the filtered books
  };

  return (
    <main className="h-screen flex justify-center items-center bg-gray-100">
      <div className="h-full w-full max-w-screen-lg mx-auto flex flex-col">
        <div className="bg-white h-1/6 sm:h-1/4 md:h-1/6 shadow-md border-b-4 border-white-600 mt-2 flex items-center justify-center ">
          <ProfileForm addBook={addBook} />
        </div>{" "}
        <div className="flex flex-col h-5/6 sm:h-3/4 md:h-5/6 py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full">
            <CustomComponent title="To-Read" />
            <CustomComponent title="In-Progress" />
            <CustomComponent title="Completed" />
          </div>
        </div>
      </div>
    </main>
  );
}
