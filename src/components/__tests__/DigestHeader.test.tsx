import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DigestHeader } from "../DigestHeader";

describe("DigestHeader", () => {
  it("renders formatted date and story count", () => {
    render(<DigestHeader date="2026-01-29" storyCount={25} />);
    expect(screen.getByText(/January 29, 2026/)).toBeInTheDocument();
    expect(screen.getByText("25 stories from Hacker News")).toBeInTheDocument();
  });

  it("uses singular for 1 story", () => {
    render(<DigestHeader date="2026-01-29" storyCount={1} />);
    expect(screen.getByText("1 story from Hacker News")).toBeInTheDocument();
  });
});
