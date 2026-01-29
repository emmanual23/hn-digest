import { synthesizeComments } from "../llm";

const mockFetch = jest.fn();
global.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockReset();
  process.env.OPENAI_API_KEY = "test-key";
});

afterEach(() => {
  delete process.env.OPENAI_API_KEY;
});

describe("synthesizeComments", () => {
  it("returns parsed takeaways from LLM response", async () => {
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
          choices: [{ message: { content: JSON.stringify(llmResponse) } }],
          usage: { total_tokens: 500 },
        }),
    });

    const result = await synthesizeComments("Test Story", ["comment 1", "comment 2"]);
    expect(result.takeaways).toHaveLength(2);
    expect(result.takeaways[0].type).toBe("consensus");
    expect(result.sentiment).toBe("divided");
    expect(result.key_debates).toEqual(["X vs Y"]);
    expect(result.model_used).toBe("gpt-4o-mini");
    expect(result.token_count).toBe(500);
  });

  it("throws when OPENAI_API_KEY is missing", async () => {
    delete process.env.OPENAI_API_KEY;
    await expect(
      synthesizeComments("Title", ["comment"])
    ).rejects.toThrow("OPENAI_API_KEY is not set");
  });

  it("throws on LLM API error", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      text: () => Promise.resolve("rate limited"),
    });

    await expect(
      synthesizeComments("Title", ["comment"])
    ).rejects.toThrow("LLM API error 429");
  });

  it("throws on empty LLM response", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          choices: [{ message: { content: "" } }],
        }),
    });

    await expect(
      synthesizeComments("Title", ["comment"])
    ).rejects.toThrow("Empty LLM response");
  });
});
