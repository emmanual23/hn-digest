import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EmptyState } from "../EmptyState";

describe("EmptyState", () => {
  it("renders the empty state message", () => {
    render(<EmptyState />);
    expect(screen.getByText("No digest available yet")).toBeInTheDocument();
    expect(
      screen.getByText(/Today's digest hasn't been generated yet/)
    ).toBeInTheDocument();
  });
});
