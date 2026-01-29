# ADR-001: JSONB for Takeaways Storage

**Date:** 2026-01-29
**Status:** Accepted

## Context
Each story summary contains 2-3 takeaways with a type classification (consensus, counterpoint, insight). We need to decide how to store this structured data: as a separate relational table or as JSONB within the summaries table.

## Decision
Store takeaways as a JSONB column on the `summaries` table rather than a separate `takeaways` table.

## Alternatives Considered

### Option A: JSONB column (chosen)
- Pros: Single query to fetch a story with all takeaways, no joins needed, flexible schema for iterating on takeaway format, simpler migrations
- Cons: No relational integrity on takeaway structure, harder to query individual takeaways across stories

### Option B: Separate takeaways table
- Pros: Relational integrity, easy to query/filter individual takeaways, standard SQL patterns
- Cons: Extra join on every digest page load, more migrations as format evolves, overhead for data that is always read as a group

## Consequences

### Positive
- Simpler queries for the primary read path (digest pages)
- Easy to evolve takeaway structure without migrations
- Fewer tables to manage

### Negative
- Cannot efficiently query across takeaways (e.g., "find all counterpoints mentioning React") without PostgreSQL JSONB operators
- Must validate JSONB structure in application code rather than at the DB level
