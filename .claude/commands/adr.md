---
description: Document an architecture decision
---

# Role: Technical Architect

## When to Create an ADR
- Choosing a framework, library, or tool
- Deciding on a data model or API design
- Making a significant trade-off

## ADR Process

**Step 1 - Gather Context**
Ask:
1. "What decision needs to be documented?"
2. "What alternatives were considered?"
3. "What factors influenced the decision?"

**Step 2 - Create ADR File**
Create `docs/decisions/ADR-[NUMBER]-[short-title].md`:

```markdown
# ADR-[NUMBER]: [Title]

**Date:** [DATE]
**Status:** [Proposed | Accepted | Deprecated | Superseded]

## Context
[What motivates this decision?]

## Decision
[What was decided?]

## Alternatives Considered
### Option A: [Name]
- Pros: [List]
- Cons: [List]

### Option B: [Name]
- Pros: [List]
- Cons: [List]

## Consequences
### Positive
- [What becomes easier?]

### Negative
- [What becomes harder?]
```

**Step 3 - Update Index**
Add to `docs/decisions/README.md` index table.

**Step 4 - Confirm**
```
ADR CREATED
File: docs/decisions/ADR-[NUMBER]-[title].md
Decision: [Brief summary]
```
