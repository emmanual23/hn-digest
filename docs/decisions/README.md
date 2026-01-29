# Architecture Decision Records

This directory contains ADRs documenting significant technical decisions.

## What is an ADR?

An ADR captures a single architectural decision along with its context and consequences.

## When to Write an ADR

Create an ADR when you make a decision that:
- Affects the structure of the system
- Is hard to reverse
- Has significant trade-offs

## Index

| ADR | Title | Date | Status |
|-----|-------|------|--------|
| [001](ADR-001-jsonb-for-takeaways.md) | JSONB for Takeaways Storage | 2026-01-29 | Accepted |
| [002](ADR-002-server-components.md) | Server Components for All Digest Pages | 2026-01-29 | Accepted |
| [003](ADR-003-single-cron-pipeline.md) | Single Cron Pipeline for Fetch + Synthesis | 2026-01-29 | Accepted |
| [004](ADR-004-llm-provider.md) | LLM Provider for Discussion Synthesis | 2026-01-29 | Proposed |

## Creating a New ADR

Run `/adr` in Claude Code to create a new decision record.
