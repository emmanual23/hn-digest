import { GET } from "../route";
import { NextRequest } from "next/server";

jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn(),
}));

import { createClient } from "@/lib/supabase/server";
const mockCreateClient = createClient as jest.MockedFunction<typeof createClient>;

describe("GET /api/digests", () => {
  it("returns paginated digests with no cursor", async () => {
    const mockDigests = [
      { id: "1", date: "2026-01-29", story_count: 30, status: "complete" },
      { id: "2", date: "2026-01-28", story_count: 25, status: "complete" },
    ];

    const mockQuery = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue({ data: mockDigests, error: null }),
    };

    mockCreateClient.mockResolvedValue({
      from: jest.fn().mockReturnValue(mockQuery),
    } as unknown as Awaited<ReturnType<typeof createClient>>);

    const res = await GET(new NextRequest("http://localhost/api/digests"));
    const body = await res.json();

    expect(body.digests).toHaveLength(2);
    expect(body.digests[0].date).toBe("2026-01-29");
    expect(body.next_cursor).toBeNull();
  });

  it("returns next_cursor when more results exist", async () => {
    // Simulate 21 results (limit+1) to trigger pagination
    const mockDigests = Array.from({ length: 21 }, (_, i) => ({
      id: String(i),
      date: `2026-01-${String(29 - i).padStart(2, "0")}`,
      story_count: 30,
      status: "complete",
    }));

    const mockQuery = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue({ data: mockDigests, error: null }),
    };

    mockCreateClient.mockResolvedValue({
      from: jest.fn().mockReturnValue(mockQuery),
    } as unknown as Awaited<ReturnType<typeof createClient>>);

    const res = await GET(new NextRequest("http://localhost/api/digests"));
    const body = await res.json();

    expect(body.digests).toHaveLength(20);
    expect(body.next_cursor).toBe("2026-01-10");
  });

  it("passes cursor to query when provided", async () => {
    const mockLt = jest.fn().mockResolvedValue({ data: [], error: null });
    const mockQuery = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      lt: mockLt,
    };

    mockCreateClient.mockResolvedValue({
      from: jest.fn().mockReturnValue(mockQuery),
    } as unknown as Awaited<ReturnType<typeof createClient>>);

    const res = await GET(
      new NextRequest("http://localhost/api/digests?cursor=2026-01-20")
    );
    const body = await res.json();

    expect(mockLt).toHaveBeenCalledWith("date", "2026-01-20");
    expect(body.digests).toHaveLength(0);
    expect(body.next_cursor).toBeNull();
  });

  it("returns 500 on database error", async () => {
    const mockQuery = {
      select: jest.fn().mockReturnThis(),
      eq: jest.fn().mockReturnThis(),
      order: jest.fn().mockReturnThis(),
      limit: jest.fn().mockResolvedValue({ data: null, error: { message: "DB error" } }),
    };

    mockCreateClient.mockResolvedValue({
      from: jest.fn().mockReturnValue(mockQuery),
    } as unknown as Awaited<ReturnType<typeof createClient>>);

    const res = await GET(new NextRequest("http://localhost/api/digests"));
    expect(res.status).toBe(500);
  });
});
