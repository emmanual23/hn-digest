import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TakeawayList } from "../TakeawayList";
import { Takeaway } from "@/types/digest";

describe("TakeawayList", () => {
  it("renders takeaways with type badges", () => {
    const takeaways: Takeaway[] = [
      { point: "Most agree on this", type: "consensus" },
      { point: "Some disagree here", type: "counterpoint" },
      { point: "Expert noted this", type: "insight" },
    ];

    render(<TakeawayList takeaways={takeaways} />);

    expect(screen.getByText("Most agree on this")).toBeInTheDocument();
    expect(screen.getByText("Some disagree here")).toBeInTheDocument();
    expect(screen.getByText("Expert noted this")).toBeInTheDocument();

    expect(screen.getByText("Consensus")).toBeInTheDocument();
    expect(screen.getByText("Counterpoint")).toBeInTheDocument();
    expect(screen.getByText("Insight")).toBeInTheDocument();
  });

  it("renders nothing when takeaways are empty", () => {
    const { container } = render(<TakeawayList takeaways={[]} />);
    expect(container.innerHTML).toBe("");
  });
});
