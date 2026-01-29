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
  model = "claude-3-5-haiku-20241022"
): Promise<SynthesisResult & { model_used: string; token_count: number | null }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is not set");

  const prompt = buildSynthesisPrompt(storyTitle, comments);

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1024,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`LLM API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  const content = data.content?.[0]?.text;
  if (!content) throw new Error("Empty LLM response");

  // Extract JSON from response (handle markdown code blocks)
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("No JSON found in LLM response");

  const parsed: SynthesisResult = JSON.parse(jsonMatch[0]);
  const tokenCount =
    (data.usage?.input_tokens ?? 0) + (data.usage?.output_tokens ?? 0) || null;

  return {
    takeaways: parsed.takeaways,
    sentiment: parsed.sentiment ?? null,
    key_debates: parsed.key_debates ?? null,
    model_used: model,
    token_count: tokenCount,
  };
}
