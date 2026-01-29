# ADR-003: Single Cron Pipeline for Fetch + Synthesis

**Date:** 2026-01-29
**Status:** Accepted

## Context
The daily digest generation involves two phases: fetching stories/comments from the HN API, then synthesizing comments via an LLM. These could be separate jobs or a single sequential pipeline.

## Decision
Use a single cron endpoint that runs the full pipeline sequentially: fetch → synthesize → store.

## Alternatives Considered

### Option A: Single sequential pipeline (chosen)
- Pros: Simple to reason about, single failure point to monitor, status tracking is straightforward (one state machine), no inter-job coordination needed
- Cons: Long-running request (may hit Vercel timeout limits), one failure blocks the entire pipeline, cannot retry synthesis independently of fetching

### Option B: Separate fetch and synthesis jobs
- Pros: Independent retry, fetch can complete even if LLM is down, better for scaling (parallelize synthesis)
- Cons: Needs coordination mechanism (queue or status polling), more complex error handling, two things to monitor instead of one

### Option C: Event-driven with queue
- Pros: Most resilient, each story synthesized independently, natural parallelism
- Cons: Requires message queue infrastructure (e.g., Inngest, QStash), significant added complexity for MVP

## Consequences

### Positive
- One endpoint to monitor and debug
- Simple status state machine on the digest row
- Easy to trigger manually for testing

### Negative
- Must handle Vercel function timeout (default 10s on Hobby, 60s on Pro, 300s on Enterprise). May need Vercel Pro plan or background functions.
- If synthesis fails for story #15 of 30, the whole pipeline needs a retry strategy. Mitigation: synthesize per-story and mark digest complete even if some summaries fail.
