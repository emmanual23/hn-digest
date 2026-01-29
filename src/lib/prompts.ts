export function buildSynthesisPrompt(
  storyTitle: string,
  comments: string[]
): string {
  const joined = comments
    .map((c, i) => `[Comment ${i + 1}]: ${c}`)
    .join("\n\n");

  return `You are analyzing a Hacker News discussion thread.

Story title: "${storyTitle}"

Below are the top comments from this discussion:

${joined}

Synthesize these comments into 2-3 key takeaways. Each takeaway should capture a distinct theme from the discussion.

Respond with ONLY valid JSON in this exact format:
{
  "takeaways": [
    { "point": "A clear, concise summary of the theme", "type": "consensus" },
    { "point": "A clear, concise summary of the theme", "type": "counterpoint" },
    { "point": "A clear, concise summary of the theme", "type": "insight" }
  ],
  "sentiment": "positive" | "negative" | "divided" | "neutral",
  "key_debates": ["short description of debate 1", "short description of debate 2"]
}

Types:
- "consensus": A point most commenters agree on
- "counterpoint": A notable opposing view or criticism
- "insight": A unique perspective from someone with domain expertise

Return 2-3 takeaways. The sentiment should reflect overall community reaction. key_debates should list 0-2 main points of disagreement.`;
}
