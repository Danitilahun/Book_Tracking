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
import useLoadingStore from "@/store/loading";
import Load from "./LoadingSpinner";
import useBookStore from "@/store/book";
import { addNewBook } from "@/utils/apiFunctions";
import { showErrorToast } from "@/utils/helper";
import { formSchema } from "@/utils/validationSchema";

export function AddNewBookForm() {
  const { isLoading, setIsLoading } = useLoadingStore((state) => ({
    isLoading: state.isLoading,
    setIsLoading: state.setIsLoading,
  }));

  const { addBook } = useBookStore((state) => ({
    addBook: state.addBook,
  }));

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

  const addNewBooks = async (title: string) => {
    try {
      setIsLoading(true);
      const content = await addNewBook(title);
      addBook(content);
    } catch (error) {
      showErrorToast("Error occurred while adding a new book");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Load />;
  }

  return (
    <div className="bg-white h-1/6 sm:h-1/4 md:h-1/6 shadow-md border-b-4 border-white-600 mt-2 flex items-center justify-center ">
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
    </div>
  );
}
