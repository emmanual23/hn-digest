import { POST } from "../route";
import { NextRequest } from "next/server";

jest.mock("@/lib/pipeline", () => ({
  runPipeline: jest.fn(),
}));

import { runPipeline } from "@/lib/pipeline";
const mockRunPipeline = runPipeline as jest.MockedFunction<typeof runPipeline>;

function makeRequest(authHeader?: string): NextRequest {
  const headers = new Headers();
  if (authHeader) headers.set("authorization", authHeader);
  return new NextRequest("http://localhost/api/cron/generate", {
    method: "POST",
    headers,
  });
}

beforeEach(() => {
  process.env.CRON_SECRET = "test-secret";
  mockRunPipeline.mockReset();
});

describe("POST /api/cron/generate", () => {
  it("returns 401 without authorization header", async () => {
    const res = await POST(makeRequest());
    expect(res.status).toBe(401);
  });

  it("returns 401 with wrong secret", async () => {
    const res = await POST(makeRequest("Bearer wrong-secret"));
    expect(res.status).toBe(401);
  });

  it("returns 200 with correct secret", async () => {
    mockRunPipeline.mockResolvedValueOnce({ digestId: "abc", storyCount: 25 });

    const res = await POST(makeRequest("Bearer test-secret"));
    expect(res.status).toBe(200);

    const body = await res.json();
    expect(body.success).toBe(true);
    expect(body.digestId).toBe("abc");
  });

  it("returns 500 when pipeline fails", async () => {
    mockRunPipeline.mockRejectedValueOnce(new Error("DB down"));

    const res = await POST(makeRequest("Bearer test-secret"));
    expect(res.status).toBe(500);

    const body = await res.json();
    expect(body.error).toBe("DB down");
  });
});
