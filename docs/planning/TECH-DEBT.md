# Technical Debt Tracker

Track known shortcuts, workarounds, and areas needing improvement.

**Last Updated:** 2026-01-29

---

## Summary

| Priority | Count | Estimated Effort |
|----------|-------|------------------|
| Critical | 0 | - |
| High | 1 | ~1 hour |
| Medium | 1 | ~30 min |
| Low | 2 | ~45 min |

---

## Active Debt Items

### Critical (Fix immediately)
*None currently*

### High (Fix this sprint)

**TD-001: Untyped Supabase query results**
- **Location:** `src/app/page.tsx:58`, `src/app/api/digests/today/route.ts:47`
- **Problem:** Uses `as any[]` to reshape Supabase join results because we lack generated database types
- **Impact:** No compile-time safety on DB query shapes; refactoring could silently break
- **Fix:** Run `supabase gen types typescript` to generate typed DB definitions, then remove `any` casts
- **Added:** 2026-01-29

### Medium (Fix next sprint)

**TD-002: No retry logic in HN API client**
- **Location:** `src/lib/hn.ts`
- **Problem:** `fetchItem` returns `null` on any failure with no retry. Comment fetches in `fetchComments` can silently drop comments on transient errors
- **Impact:** Occasional missing comments in digest; acceptable for MVP but reduces synthesis quality
- **Fix:** Add exponential backoff retry (1-2 attempts) to `fetchItem`
- **Added:** 2026-01-29

### Low (Fix when convenient)

**TD-003: Duplicate digest query reshaping logic**
- **Location:** `src/app/page.tsx`, `src/app/digest/[date]/page.tsx`, `src/app/api/digests/today/route.ts`
- **Problem:** The `Array.isArray(s.summaries) ? ...` pattern for reshaping Supabase 1:1 joins is repeated in 3 places
- **Impact:** Low — simple pattern, but changes to the shape require updating 3 files
- **Fix:** Extract into a shared `reshapeStories()` utility in `src/lib/utils.ts`
- **Added:** 2026-01-29

**TD-004: Sequential story fetching in pipeline**
- **Location:** `src/lib/pipeline.ts:47-52`
- **Problem:** Stories are fetched one-by-one in a `for` loop instead of parallel batches
- **Impact:** Pipeline runs slower than necessary (~30 sequential API calls). Acceptable since it runs once daily via cron
- **Fix:** Use `Promise.all` with batches of 5-10 concurrent fetches, respecting HN API rate limits
- **Added:** 2026-01-29

---

## Resolved Debt

| ID | Title | Resolved Date | Resolution |
|----|-------|---------------|------------|
| - | - | - | - |

---

## Process

### When to Add Debt
- Taking a shortcut to meet a deadline
- Implementing a workaround for a bug
- Skipping tests for expedience
- Using deprecated APIs

### Debt Review Cadence
- Review during sprint planning
- Allocate 20-30% of sprint capacity to debt reduction
