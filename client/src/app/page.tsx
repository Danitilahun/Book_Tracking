"use client";
import CustomComponent from "./components/CustomComponent";
import { ProfileForm } from "./components/ProfileForm";
import useSWR from "swr";
import { fetcher } from "@/lib";

export default function Home() {
  const { data, error, isLoading } = useSWR<any>(`/api/books`, fetcher);

  // Check if the data is available and loading has finished before initializing state
  const initialBooks: Book[] =
    !isLoading && !error && data?.result ? data.result : [];

  // Filter books based on their status
  const toReadBooks = initialBooks?.filter((book) => book.status === "To-Read");
  const inProgressBooks = initialBooks?.filter(
    (book) => book.status === "In-Progress"
  );
  const completedBooks = initialBooks?.filter(
    (book) => book.status === "Completed"
  );

  const addBook = async (title: string) => {
    const add = await fetch("/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, status: "To-Read" }),
    });
    const content = await add.json();
  };

  console.log(toReadBooks, inProgressBooks, completedBooks);

  return (
    <main className="h-screen flex justify-center items-center bg-gray-100">
      <div className="h-full w-full max-w-screen-lg mx-auto flex flex-col">
        <div className="bg-white h-1/6 sm:h-1/4 md:h-1/6 shadow-md border-b-4 border-white-600 mt-2 flex items-center justify-center ">
          <ProfileForm addBook={addBook} />
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
