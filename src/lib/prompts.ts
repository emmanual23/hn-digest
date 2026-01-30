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

Synthesize these comments into 3-5 key takeaways. Each takeaway should capture a distinct theme from the discussion.

Respond with ONLY valid JSON in this exact format:
{
  "takeaways": [
    { "point": "A clear, concise summary of the theme", "type": "consensus" }
  ],
  "sentiment": "positive" | "negative" | "divided" | "neutral",
  "key_debates": [
    { "topic": "Short debate title", "for": "Argument in favor", "against": "Argument against" }
  ],
  "quotes": [
    { "text": "Notable quote from discussion", "author": "hn_username" }
  ],
  "topics": ["ai", "security"]
}

Takeaway types:
- "consensus": A point most commenters agree on
- "counterpoint": A notable opposing view or criticism
- "insight": A unique perspective from someone with domain expertise
- "question": An important open question raised by the community
- "recommendation": A practical suggestion or resource shared by commenters

Return 3-5 takeaways. The sentiment should reflect overall community reaction. key_debates should list 0-2 structured debates with arguments for and against. quotes should contain 1-3 notable direct quotes with HN username attribution. topics should contain 2-4 lowercase topic tags (e.g. "ai", "security", "startups").`;
}
