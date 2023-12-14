export const fetchAllBooks = async (): Promise<any> => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/books`);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const addNewBook = async (title: string): Promise<any> => {
  try {
    const add = await fetch(`http://127.0.0.1:8000/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, status: "To-Read" }),
    });

    if (!add.ok) {
      throw new Error("Failed to add new book");
    }

    const content = await add.json();
    return content;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updateBookStatus = async (
  bookId: number,
  newStatus: string
): Promise<void> => {
  try {
    const formData = {
      status: newStatus,
    };
    const res = await fetch(`http://127.0.0.1:8000/books/${bookId}`, {
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
    return content;
  } catch (error) {
    throw new Error("Error updating book status");
  }
};

export const removeBook = async (id: number): Promise<void> => {
  try {
    const res = await fetch(`http://127.0.0.1:8000/books/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete book");
    }

    return;
  } catch (error) {
    throw new Error("Error removing book");
  }
};
