# ADR-004: LLM Provider for Discussion Synthesis

**Date:** 2026-01-29
**Status:** Proposed

## Context
Discussion synthesis is the core feature. We need an LLM that can process ~50 comments per story and produce structured takeaways reliably. Cost, quality, and structured output support are the key factors.

## Decision
**Deferred.** Start with OpenAI (gpt-4o-mini) for cost efficiency during development and early MVP. Abstract the LLM client behind an interface to allow switching providers.

## Alternatives Considered

### Option A: OpenAI gpt-4o-mini (initial choice)
- Pros: Low cost (~$0.15/1M input tokens), fast, good structured output support (JSON mode), large context window
- Cons: Lower quality than flagship models for nuanced synthesis, OpenAI dependency

### Option B: Anthropic Claude (Haiku or Sonnet)
- Pros: Strong at nuanced text analysis, good at following complex instructions, competitive pricing
- Cons: Slightly different API patterns, structured output requires more prompt engineering

### Option C: Self-hosted open source (Llama, Mistral)
- Pros: No per-token cost, full control, no vendor dependency
- Cons: Hosting infrastructure needed, lower quality for synthesis tasks, significant ops overhead for MVP

## Consequences

### Positive
- Abstracted LLM client (`src/lib/llm.ts`) makes switching providers a config change
- Starting with cheapest viable option keeps MVP costs under $5/day target
- Can A/B test providers later by storing `model_used` on each summary

### Negative
- gpt-4o-mini may produce lower-quality synthesis than desired; may need to upgrade sooner than expected
- Provider abstraction adds a small amount of indirection
