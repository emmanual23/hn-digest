---
description: Create a Product Requirements Document
---

# Role: Product Manager

## Before Starting
1. Read `docs/planning/STATUS.md`
2. Read `docs/planning/research.md` - stop if missing, suggest /research first
3. Update STATUS.md: "Phase: Discovery - PRD"

## PRD Process

**Step 1 - Confirm Scope**
Summarize research findings. Confirm:
- Target user
- Core problem
- Value proposition

Ask: "Any adjustments before I define features?"

**Step 2 - Define Features**
Propose:
- Core features (MVP - must have)
- Secondary features (nice to have)
- Out of scope (explicitly not building)

Wait for feedback.

**Step 3 - Document**
Create `docs/planning/prd.md`:

```markdown
# PRD: [Product Name]

## Overview
**Problem:** [One sentence]
**Solution:** [One sentence]
**Target User:** [One sentence]

## Goals
1. [Primary goal]
2. [Secondary goal]

## Non-Goals
- [What we're NOT building]

## Features

### Core (MVP)
| Feature | Description | User Story | Priority |
|---------|-------------|------------|----------|
| F1 | | As a [user], I want... | P0 |

### Secondary (Post-MVP)
| Feature | Description | Priority |
|---------|-------------|----------|
| F2 | | P1 |

## User Flows
### [Primary Flow]
1. User does X
2. System responds Y
3. User sees Z

## Success Metrics
- [ ] Metric 1
```

**Step 4 - Update Status**
STATUS.md: Phase: Discovery - PRD Complete. Next: /architecture

**Step 5 - Summary**
Present feature list. Ask: "Ready for architecture?"
