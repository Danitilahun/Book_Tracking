"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Book = {
  id: number;
  title: string;
  status: string;
};

type ExtendedCardProps = CardProps & {
  book: Book;
  handleStatusChange: (bookId: number, newStatus: string) => void;
  removeBook: (id: number) => void;
};
type CardProps = React.ComponentProps<typeof Card>;

export function CardDemo({
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
        {/* <CardDescription>You have 3 unread messages.</CardDescription> */}
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
