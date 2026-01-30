import { GET } from "../route";
import { NextRequest } from "next/server";

jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn(),
}));

import { createClient } from "@/lib/supabase/server";
const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>;

describe("GET /api/digests/[date]", () => {
  it("returns 400 for invalid date format", async () => {
    const request = new NextRequest("http://localhost/api/digests/not-a-date");
    const params = Promise.resolve({ date: "not-a-date" });

    const res = await GET(request, { params });
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe("Invalid date format");
  });

  it("returns 404 when digest does not exist", async () => {
    const mockQuery = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: null, error: { message: "not found" } }),
    };

    mockCreateClient.mockResolvedValue({
      from: jest.fn().mockReturnValue(mockQuery),
    } as unknown as Awaited<ReturnType<typeof createClient>>);

    const request = new NextRequest("http://localhost/api/digests/1999-01-01");
    const params = Promise.resolve({ date: "1999-01-01" });

    const res = await GET(request, { params });
    expect(res.status).toBe(404);
  });

  it("returns digest with stories and reshaped summaries for valid date", async () => {
    const mockDigest = {
      id: "d1",
      date: "2026-01-29",
      story_count: 2,
      status: "complete",
      created_at: "2026-01-29T12:00:00Z",
      stories: [
        {
          id: "s1",
          hn_id: 123,
          title: "Story One",
          url: "https://example.com",
          author: "alice",
          score: 100,
          comment_count: 50,
          posted_at: "2026-01-29T08:00:00Z",
          rank: 2,
          summaries: {
            id: "sum1",
            takeaways: [{ point: "Key insight", type: "consensus" }],
            sentiment: "positive",
            key_debates: [],
            model_used: "claude-3-5-haiku",
            token_count: 300,
            generated_at: "2026-01-29T12:00:00Z",
          },
        },
        {
          id: "s2",
          hn_id: 456,
          title: "Story Two",
          url: null,
          author: "bob",
          score: 50,
          comment_count: 10,
          posted_at: "2026-01-29T09:00:00Z",
          rank: 1,
          summaries: null,
        },
      ],
    };

    const mockQuery = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      single: jest.fn().mockResolvedValue({ data: mockDigest, error: null }),
    };

    mockCreateClient.mockResolvedValue({
      from: jest.fn().mockReturnValue(mockQuery),
    } as unknown as Awaited<ReturnType<typeof createClient>>);

    const request = new NextRequest("http://localhost/api/digests/2026-01-29");
    const params = Promise.resolve({ date: "2026-01-29" });

    const res = await GET(request, { params });
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.digest.date).toBe("2026-01-29");
    expect(body.digest.stories).toHaveLength(2);

    // Stories sorted by rank
    expect(body.digest.stories[0].title).toBe("Story Two");
    expect(body.digest.stories[1].title).toBe("Story One");

    // Summary reshaped from object to .summary
    expect(body.digest.stories[1].summary.sentiment).toBe("positive");
    expect(body.digest.stories[1].summary.takeaways).toHaveLength(1);

    // Null summary handled
    expect(body.digest.stories[0].summary).toBeNull();
  });
});
