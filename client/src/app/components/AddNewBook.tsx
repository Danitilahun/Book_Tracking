"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  bookTitle: z.string().min(2, {
    message: "Book title must be at least 3 characters long",
  }),
});

export function AddNewBookForm({
  addNewBooks,
}: {
  addNewBooks: (title: string) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookTitle: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addNewBooks(values.bookTitle);
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 sm:w-3/4 md:w-1/2 lg:w-1/3"
      >
        <FormField
          control={form.control}
          name="bookTitle"
          render={({ field }) => (
            <FormItem>
              <div className="flex gap-2">
                <FormControl>
                  <Input placeholder="Book title" {...field} />
                </FormControl>
                <Button type="submit">Add Book</Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
