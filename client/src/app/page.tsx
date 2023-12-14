"use client";
import { AddNewBookForm } from "./components/AddNewBook";
import useBookStore from "@/store/book";
import { useEffect } from "react";
import useLoadingStore from "@/store/loading";
import { fetchAllBooks } from "@/utils/apiFunctions";
import BookShelf from "./components/BookShelf";
import { showErrorToast } from "@/utils/helper";
import LoadingSpinner from "./components/LoadingSpinner";

export default function Home() {
  const { addBooks } = useBookStore((state) => ({
    addBooks: state.addBooks,
  }));

  const { isLoading, setIsLoading } = useLoadingStore((state) => ({
    isLoading: state.isLoading,
    setIsLoading: state.setIsLoading,
  }));

  useEffect(() => {
    fetchDataAndSetBooks();
  }, []);

  const fetchDataAndSetBooks = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllBooks();
      addBooks(data || []);
    } catch (error) {
      showErrorToast(
        "Error occurred while fetching data. Check your connection."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="h-screen flex justify-center items-center bg-gray-100">
      <section className="h-full w-full max-w-screen-lg mx-auto flex flex-col">
        <AddNewBookForm />
        <BookShelf />
      </section>
    </main>
  );
}
