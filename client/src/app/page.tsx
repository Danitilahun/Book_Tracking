"use client";
import CustomComponent from "./components/CustomComponent";
import { ProfileForm } from "./components/ProfileForm";
import useBookStore from "@/store/book";
import { useEffect } from "react";

export default function Home() {
  const addBooks = useBookStore((state) => state.addBooks);
  const addBook = useBookStore((state) => state.addBook);

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`/api/books`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      addBooks(data.result || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const books = useBookStore((state) => state.books);

  // Filter books based on their status
  const toReadBooks = books?.filter((book) => book?.status === "To-Read");
  const inProgressBooks = books?.filter(
    (book) => book?.status === "In-Progress"
  );
  const completedBooks = books?.filter((book) => book?.status === "Completed");

  const addNewBooks = async (title: string) => {
    const add = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, status: "To-Read" }),
    });

    console.log(add);
    const content = await add.json();

    console.log("content", content);
    addBook(content);
  };

  return (
    <main className="h-screen flex justify-center items-center bg-gray-100">
      <div className="h-full w-full max-w-screen-lg mx-auto flex flex-col">
        <div className="bg-white h-1/6 sm:h-1/4 md:h-1/6 shadow-md border-b-4 border-white-600 mt-2 flex items-center justify-center ">
          <ProfileForm addNewBooks={addNewBooks} />
        </div>{" "}
        <div className="flex flex-col h-5/6 sm:h-3/4 md:h-5/6 py-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 h-full">
            <CustomComponent title="To-Read" books={toReadBooks} />
            <CustomComponent title="In-Progress" books={inProgressBooks} />
            <CustomComponent title="Completed" books={completedBooks} />
          </div>
        </div>
      </div>
    </main>
  );
}
