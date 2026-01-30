import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ArchiveList } from "../ArchiveList";

describe("ArchiveList", () => {
  it("renders a list of digests with dates and story counts", () => {
    const digests = [
      { id: "1", date: "2026-01-29", story_count: 30 },
      { id: "2", date: "2026-01-28", story_count: 25 },
    ];

    render(<ArchiveList digests={digests} />);

    expect(screen.getByText(/January 29, 2026/)).toBeInTheDocument();
    expect(screen.getByText(/January 28, 2026/)).toBeInTheDocument();
    expect(screen.getByText("30 stories")).toBeInTheDocument();
    expect(screen.getByText("25 stories")).toBeInTheDocument();
  });

  it("renders links to digest pages", () => {
    const digests = [{ id: "1", date: "2026-01-29", story_count: 30 }];

    render(<ArchiveList digests={digests} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/digest/2026-01-29");
  });

  it("uses singular 'story' for count of 1", () => {
    const digests = [{ id: "1", date: "2026-01-29", story_count: 1 }];

    render(<ArchiveList digests={digests} />);
    expect(screen.getByText("1 story")).toBeInTheDocument();
  });

  it("shows empty message when no digests", () => {
    render(<ArchiveList digests={[]} />);
    expect(screen.getByText("No past digests available yet.")).toBeInTheDocument();
  });
});
