import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DigestNav } from "../DigestNav";

describe("DigestNav", () => {
  it("renders both previous and next links", () => {
    render(
      <DigestNav
        currentDate="2026-01-28"
        previousDate="2026-01-27"
        nextDate="2026-01-29"
      />
    );

    const prev = screen.getByText("Previous");
    const next = screen.getByText("Next");
    expect(prev.closest("a")).toHaveAttribute("href", "/digest/2026-01-27");
    expect(next.closest("a")).toHaveAttribute("href", "/digest/2026-01-29");
  });

  it("hides previous when null", () => {
    render(
      <DigestNav
        currentDate="2026-01-27"
        previousDate={null}
        nextDate="2026-01-28"
      />
    );

    expect(screen.queryByText("Previous")).not.toBeInTheDocument();
    expect(screen.getByText("Next")).toBeInTheDocument();
  });

  it("hides next when null", () => {
    render(
      <DigestNav
        currentDate="2026-01-29"
        previousDate="2026-01-28"
        nextDate={null}
      />
    );

    expect(screen.getByText("Previous")).toBeInTheDocument();
    expect(screen.queryByText("Next")).not.toBeInTheDocument();
  });
});
