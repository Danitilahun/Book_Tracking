import React from "react";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { showErrorToast } from "@/utils/helper";
import { removeBook, updateBookStatus } from "@/utils/apiFunctions";
import useBookStore from "@/store/book";

interface BookActionsProps {
  bookId: number;
  status: string;
}

const BookActions: React.FC<BookActionsProps> = ({ bookId, status }) => {
  const removeBookLocally = useBookStore((state) => state.removeBook);
  const updateBookLocally = useBookStore((state) => state.updateBook);

  const handleStatusChange = async (newStatus: string) => {
    try {
      await updateBookStatus(bookId, newStatus);
      updateBookLocally(bookId, { status: newStatus });
    } catch (error) {
      showErrorToast("Error while updating book status.");
    }
  };

  const removeBooks = async () => {
    try {
      await removeBook(bookId);
      removeBookLocally(bookId);
    } catch (error) {
      showErrorToast("Error while removing book.");
    }
  };

  return (
    <CardFooter className="flex-col gap-2">
      {status !== "To-Read" && (
        <Button
          className="w-full"
          onClick={() => handleStatusChange("To-Read")}
        >
          Mark as to-read
        </Button>
      )}
      {status !== "In-Progress" && (
        <Button
          className="w-full"
          onClick={() => handleStatusChange("In-Progress")}
        >
          Mark as in progress
        </Button>
      )}
      {status !== "Completed" && (
        <Button
          className="w-full"
          onClick={() => handleStatusChange("Completed")}
        >
          Mark as completed
        </Button>
      )}
      <Button
        className="w-full bg-red-500 hover:bg-red-800 transition-colors duration-300 ease-in-out"
        onClick={removeBooks}
      >
        Delete
      </Button>
    </CardFooter>
  );
};

export default BookActions;
