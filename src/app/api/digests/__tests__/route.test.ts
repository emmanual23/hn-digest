import { GET } from "../route";
import { NextRequest } from "next/server";

jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn(),
}));

import { createClient } from "@/lib/supabase/server";
const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>;

function makeRequest(url: string): NextRequest {
  return new NextRequest(url);
}

describe("GET /api/digests", () => {
  it("returns paginated digests", async () => {
    const mockDigests = [
      { id: "1", date: "2026-01-29", story_count: 30, status: "complete" },
      { id: "2", date: "2026-01-28", story_count: 25, status: "complete" },
    ];

    // Without cursor, lt() won't be called, so chain resolves at limit()
    const mockQueryNoCursor = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue({ data: mockDigests, error: null }),
    };

    mockCreateClient.mockResolvedValue({
      from: jest.fn().mockReturnValue(mockQueryNoCursor),
    } as unknown as Awaited<ReturnType<typeof createClient>>);

    const res = await GET(makeRequest("http://localhost/api/digests"));
    const body = await res.json();

    expect(body.digests).toHaveLength(2);
    expect(body.next_cursor).toBeNull();
  });
});
