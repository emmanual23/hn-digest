import { synthesizeComments } from "../llm";

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
  process.env.ANTHROPIC_API_KEY = "test-key";
});

afterEach(() => {
  delete process.env.ANTHROPIC_API_KEY;
});

describe("synthesizeComments", () => {
  it("returns parsed takeaways from Anthropic response", async () => {
    const llmResponse = {
      takeaways: [
        { point: "Everyone agrees on X", type: "consensus" },
        { point: "Some disagree about Y", type: "counterpoint" },
      ],
      sentiment: "divided",
      key_debates: ["X vs Y"],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          content: [{ type: "text", text: JSON.stringify(llmResponse) }],
          usage: { input_tokens: 300, output_tokens: 200 },
        }),
    });

    const result = await synthesizeComments("Test Story", ["comment 1", "comment 2"]);
    expect(result.takeaways).toHaveLength(2);
    expect(result.takeaways[0].type).toBe("consensus");
    expect(result.sentiment).toBe("divided");
    expect(result.key_debates).toEqual(["X vs Y"]);
    expect(result.model_used).toBe("claude-3-5-haiku-20241022");
    expect(result.token_count).toBe(500);
  });

  it("throws when ANTHROPIC_API_KEY is missing", async () => {
    delete process.env.ANTHROPIC_API_KEY;
    await expect(
      synthesizeComments("Title", ["comment"])
    ).rejects.toThrow("ANTHROPIC_API_KEY is not set");
  });

  it("throws on API error", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      text: () => Promise.resolve("rate limited"),
    });

    await expect(
      synthesizeComments("Title", ["comment"])
    ).rejects.toThrow("LLM API error 429");
  });

  it("throws on empty response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          content: [{ type: "text", text: "" }],
        }),
    });

    await expect(
      synthesizeComments("Title", ["comment"])
    ).rejects.toThrow("Empty LLM response");
  });

  it("extracts JSON from markdown code blocks", async () => {
    const llmResponse = {
      takeaways: [{ point: "Key point", type: "insight" }],
      sentiment: "neutral",
      key_debates: [],
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          content: [{ type: "text", text: "```json\n" + JSON.stringify(llmResponse) + "\n```" }],
          usage: { input_tokens: 100, output_tokens: 50 },
        }),
    });

    const result = await synthesizeComments("Title", ["comment"]);
    expect(result.takeaways[0].point).toBe("Key point");
  });
});
