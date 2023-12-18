import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import LoadingSpinner from "./LoadingSpinner";
import useLoadingStore from "@/store/loading";
import { cn } from "@/lib/utils";
import BookActions from "./BookActions";
import { EditBookTitle } from "./EditBookTitle";

interface BookCardProps {
  className?: string;
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ className, book }) => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Card className={cn("w-full m-1", className)}>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle
            className={cn(
              "text-lg font-bold truncate hover:(whitespace-normal",
              className
            )}
          >
            {book.title}
          </CardTitle>

          <EditBookTitle
            oldtitle={book.title}
            id={book.id}
            status={book.status}
          />
        </div>
      </CardHeader>
      <BookActions bookId={book.id} status={book.status} />
    </Card>
  );
};

export default BookCard;
