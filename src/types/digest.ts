export interface Takeaway {
  point: string;
  type: "consensus" | "counterpoint" | "insight";
}

export interface Digest {
  id: string;
  date: string;
  story_count: number;
  status: "pending" | "fetching" | "synthesizing" | "complete" | "failed";
  created_at: string;
}

export interface Story {
  id: string;
  digest_id: string;
  hn_id: number;
  title: string;
  url: string | null;
  author: string;
  score: number;
  comment_count: number;
  posted_at: string;
  rank: number;
}

export interface Summary {
  id: string;
  story_id: string;
  takeaways: Takeaway[];
  sentiment: string | null;
  key_debates: string[] | null;
  model_used: string;
  token_count: number | null;
  generated_at: string;
}

export interface StoryWithSummary extends Story {
  summary: Summary | null;
}

export interface DigestWithStories extends Digest {
  stories: StoryWithSummary[];
}
