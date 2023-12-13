import { z } from "zod";

export const formSchema = z.object({
  bookTitle: z.string().min(2, {
    message: "Book title must be at least 3 characters long",
  }),
});
