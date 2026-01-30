import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SentimentBadge } from "../SentimentBadge";

describe("SentimentBadge", () => {
  it("renders 'Agrees' for positive sentiment", () => {
    render(<SentimentBadge sentiment="positive" />);
    expect(screen.getByText("Agrees")).toBeInTheDocument();
  });

  it("renders 'Disagrees' for negative sentiment", () => {
    render(<SentimentBadge sentiment="negative" />);
    expect(screen.getByText("Disagrees")).toBeInTheDocument();
  });

  it("renders 'Divided' for divided sentiment", () => {
    render(<SentimentBadge sentiment="divided" />);
    expect(screen.getByText("Divided")).toBeInTheDocument();
  });

  it("renders 'Neutral' for neutral sentiment", () => {
    render(<SentimentBadge sentiment="neutral" />);
    expect(screen.getByText("Neutral")).toBeInTheDocument();
  });

  it("renders nothing when sentiment is null", () => {
    const { container } = render(<SentimentBadge sentiment={null} />);
    expect(container.innerHTML).toBe("");
  });

  it("falls back to Neutral for unknown sentiment", () => {
    render(<SentimentBadge sentiment="unknown" />);
    expect(screen.getByText("Neutral")).toBeInTheDocument();
  });
});
