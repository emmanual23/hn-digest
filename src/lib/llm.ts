import { Takeaway } from "@/types/digest";
import { buildSynthesisPrompt } from "./prompts";

interface SynthesisResult {
  takeaways: Takeaway[];
  sentiment: string | null;
  key_debates: string[] | null;
}

export async function synthesizeComments(
  storyTitle: string,
  comments: string[],
  model = "gpt-4o-mini"
): Promise<SynthesisResult & { model_used: string; token_count: number | null }> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not set");

  const prompt = buildSynthesisPrompt(storyTitle, comments);

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      response_format: { type: "json_object" },
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`LLM API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  const content = data.choices[0]?.message?.content;
  if (!content) throw new Error("Empty LLM response");

  const parsed: SynthesisResult = JSON.parse(content);
  const tokenCount = data.usage?.total_tokens ?? null;

  return {
    takeaways: parsed.takeaways,
    sentiment: parsed.sentiment ?? null,
    key_debates: parsed.key_debates ?? null,
    model_used: model,
    token_count: tokenCount,
  };
}
