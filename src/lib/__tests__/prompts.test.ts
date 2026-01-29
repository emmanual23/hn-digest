import { buildSynthesisPrompt } from "../prompts";

describe("buildSynthesisPrompt", () => {
  it("includes the story title", () => {
    const prompt = buildSynthesisPrompt("Test Story", ["comment 1"]);
    expect(prompt).toContain('"Test Story"');
  });

  it("includes all comments with numbered labels", () => {
    const prompt = buildSynthesisPrompt("Title", ["first", "second", "third"]);
    expect(prompt).toContain("[Comment 1]: first");
    expect(prompt).toContain("[Comment 2]: second");
    expect(prompt).toContain("[Comment 3]: third");
  });

  it("requests JSON output with takeaways structure", () => {
    const prompt = buildSynthesisPrompt("Title", ["comment"]);
    expect(prompt).toContain("takeaways");
    expect(prompt).toContain("sentiment");
    expect(prompt).toContain("key_debates");
    expect(prompt).toContain("JSON");
  });
});
