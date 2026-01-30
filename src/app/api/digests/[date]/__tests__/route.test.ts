import { GET } from "../route";
import { NextRequest } from "next/server";

describe("GET /api/digests/[date]", () => {
  it("returns 400 for invalid date format", async () => {
    const request = new NextRequest("http://localhost/api/digests/not-a-date");
    const params = Promise.resolve({ date: "not-a-date" });

    const res = await GET(request, { params });
    expect(res.status).toBe(400);

    const body = await res.json();
    expect(body.error).toBe("Invalid date format");
  });
});
