import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { TopicFilter } from "../TopicFilter";

describe("TopicFilter", () => {
  const defaultProps = {
    topics: ["AI", "Cloud", "Rust"],
    selectedTopics: [] as string[],
    onToggle: jest.fn(),
    onClear: jest.fn(),
  };

  it("renders nothing when topics array is empty", () => {
    const { container } = render(
      <TopicFilter {...defaultProps} topics={[]} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders a button for each topic", () => {
    render(<TopicFilter {...defaultProps} />);
    expect(screen.getByText("AI")).toBeInTheDocument();
    expect(screen.getByText("Cloud")).toBeInTheDocument();
    expect(screen.getByText("Rust")).toBeInTheDocument();
  });

  it("clicking a topic calls onToggle with that topic", async () => {
    const onToggle = jest.fn();
    render(<TopicFilter {...defaultProps} onToggle={onToggle} />);
    await userEvent.click(screen.getByText("AI"));
    expect(onToggle).toHaveBeenCalledWith("AI");
  });

  it("selected topics get active styling", () => {
    render(<TopicFilter {...defaultProps} selectedTopics={["AI"]} />);
    const aiButton = screen.getByText("AI");
    expect(aiButton).toHaveClass("bg-slate-700", "text-white");
  });

  it("unselected topics get default styling", () => {
    render(<TopicFilter {...defaultProps} />);
    const aiButton = screen.getByText("AI");
    expect(aiButton).toHaveClass("bg-slate-100", "text-slate-600");
  });

  it("renders Clear button only when topics are selected", () => {
    const { rerender } = render(<TopicFilter {...defaultProps} />);
    expect(screen.queryByText("Clear")).not.toBeInTheDocument();

    rerender(<TopicFilter {...defaultProps} selectedTopics={["AI"]} />);
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("clicking Clear calls onClear", async () => {
    const onClear = jest.fn();
    render(
      <TopicFilter {...defaultProps} selectedTopics={["AI"]} onClear={onClear} />
    );
    await userEvent.click(screen.getByText("Clear"));
    expect(onClear).toHaveBeenCalled();
  });
});
