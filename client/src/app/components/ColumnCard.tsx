import React, { FC } from "react";
import { BookCard } from "./BookCard";
import useBookStore from "@/store/book";
import { toast } from "react-toastify";
import Load from "./Loader";
import useLoadingStore from "@/store/loading";

interface ColumnCardProps {
  title: string;
  books: Book[];
}

const ColumnCard: FC<ColumnCardProps> = ({ title, books }) => {
  const removeBook = useBookStore((state) => state.removeBook);
  const updateBook = useBookStore((state) => state.updateBook);
  const isLoading = useLoadingStore((state) => state.isLoading);
  const setIsLoading = useLoadingStore((state) => state.setIsLoading);

  const handleStatusChange = async (bookId: number, newStatus: string) => {
    try {
      setIsLoading(true);
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

      if (!res.ok) {
        throw new Error("Failed to update book status");
      }

      const content = await res.json();
      updateBook(bookId, { status: newStatus });
    } catch (error) {
      toast("Error happen in fetching", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeBooks = async (id: number) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/books/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete book");
      }

      removeBook(id);
    } catch (error) {
      toast("Error happen in fetching", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Load />;
  }
  return (
    <div className="bg-white rounded-lg shadow-md border-2 border-white-600 h-[550px]">
      <div className="h-20  bg-white rounded-lg shadow-md border-2 border-white-600 flex justify-center items-center">
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div className=" max-h-[450px] overflow-y-auto overflow-x-hidden   mb-0 p-2 flex flex-col items-center ">
        {books?.map((book, index) => (
          <BookCard
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

export default ColumnCard;
