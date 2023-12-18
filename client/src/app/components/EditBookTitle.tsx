import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { updateBookTitle } from "@/utils/apiFunctions";
import useBookStore from "@/store/book";
import { showErrorToast } from "@/utils/helper";

const FormSchema = z.object({
  title: z.string().min(2, {
    message: "Book title must be at least 2 characters.",
  }),
});

export function EditBookTitle({
  oldtitle,
  id,
  status,
}: {
  oldtitle: string;
  id: number;
  status: string;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const updateBookLocally = useBookStore((state) => state.updateBook);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: oldtitle,
    },
  });

  useEffect(() => {
    form.setValue("title", oldtitle);
  }, [oldtitle]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (status !== "Completed") {
      EditBook(data.title);
    } else {
      showErrorToast("Cannot edit title of completed book.");
    }
    setDialogOpen(false);
  }

  const EditBook = async (newtitle: string) => {
    try {
      await updateBookTitle(id, newtitle);
      updateBookLocally(id, { title: newtitle });
    } catch (error) {
      showErrorToast("Error while updating book title.");
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleOpen = () => {
    setDialogOpen(true);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleClose}>
      <Button variant="outline" onClick={handleOpen}>
        Edit Title
      </Button>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="book title" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
