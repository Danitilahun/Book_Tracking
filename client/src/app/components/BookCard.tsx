"use client";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ExtendedCardProps = CardProps & {
  book: Book;
  handleStatusChange: (bookId: number, newStatus: string) => void;
  removeBook: (id: number) => void;
};
type CardProps = React.ComponentProps<typeof Card>;

export function BookCard({
  className,
  handleStatusChange,
  removeBook,
  book,
  ...props
}: ExtendedCardProps) {
  const handleDelete = () => {
    removeBook(book.id);
  };
  return (
    <Card className={cn("w-full m-2", className)} {...props}>
      <CardHeader>
        <CardTitle
          className={cn(
            "text-lg font-bold truncate hover:(whitespace-normal",
            className
          )}
        >
          {book.title}
        </CardTitle>
      </CardHeader>

      <CardFooter className="flex-col gap-2">
        {book.status !== "To-Read" && (
          <Button
            className="w-full"
            onClick={() => handleStatusChange(book.id, "To-Read")}
          >
            Mark as to-read
          </Button>
        )}
        {book.status !== "In-Progress" && (
          <Button
            className="w-full"
            onClick={() => handleStatusChange(book.id, "In-Progress")}
          >
            Mark as in progress
          </Button>
        )}
        {book.status !== "Completed" && (
          <Button
            className="w-full"
            onClick={() => handleStatusChange(book.id, "Completed")}
          >
            Mark as Completed
          </Button>
        )}
        <Button className="w-full bg-red-500" onClick={handleDelete}>
          delete
        </Button>
      </CardFooter>
    </Card>
  );
}
