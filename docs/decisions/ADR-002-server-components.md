# ADR-002: Server Components for All Digest Pages

**Date:** 2026-01-29
**Status:** Accepted

## Context
Digest pages are read-only content generated once daily. We need to decide between React Server Components (RSC) with direct Supabase queries vs. client-side fetching with API routes.

## Decision
Use Server Components for all digest pages, querying Supabase directly from the server with no client-side state management.

## Alternatives Considered

### Option A: Server Components with direct DB queries (chosen)
- Pros: No API round-trip, better SEO, simpler code (no useEffect/useState), faster initial page load, no loading spinners
- Cons: No client-side interactivity without adding Client Components later, full page navigation between digests

### Option B: Client Components with API fetching
- Pros: Smoother transitions between pages, easier to add interactivity later, API routes reusable by other clients
- Cons: Loading states needed, worse SEO without extra config, more code for the same result, unnecessary complexity for static content

### Option C: Static Site Generation (SSG)
- Pros: Fastest possible page loads, zero server cost per request
- Cons: Requires rebuild when digest is generated, more complex deployment pipeline, stale content if build fails

## Consequences

### Positive
- Minimal JavaScript sent to the client
- SEO-friendly out of the box
- Simpler mental model — no client/server data sync

### Negative
- Adding interactivity later (e.g., bookmarking, filtering) will require introducing Client Components
- API routes still needed for the cron job and potential future clients, so some duplication of query logic may occur
