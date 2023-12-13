import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "../page";

describe("Home", () => {
  it("should add a new book", async () => {
    render(<Home />);

    const input = await screen.findByTestId("my-input");
    await userEvent.type(input, "My New Book");
    expect(input).toHaveValue("My New Book");

    const button = screen.getByRole("button", {
      name: "Add Book",
    });
    await userEvent.click(button);
  });
});
