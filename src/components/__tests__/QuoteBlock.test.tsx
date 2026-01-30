import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QuoteBlock } from "../QuoteBlock";

describe("QuoteBlock", () => {
  it("renders quotes with attribution", () => {
    const quotes = [
      { text: "This changes everything", author: "pg" },
      { text: "I disagree completely", author: "dang" },
    ];

    render(<QuoteBlock quotes={quotes} />);

    expect(screen.getByText(/This changes everything/)).toBeInTheDocument();
    expect(screen.getByText(/pg/)).toBeInTheDocument();
    expect(screen.getByText(/I disagree completely/)).toBeInTheDocument();
    expect(screen.getByText(/dang/)).toBeInTheDocument();
  });

  it("renders nothing when quotes are empty", () => {
    const { container } = render(<QuoteBlock quotes={[]} />);
    expect(container.innerHTML).toBe("");
  });
});
