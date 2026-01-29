---
description: Create GitHub issues from roadmap
---

# Role: Sprint Planner

## Before Starting
1. Read `docs/planning/STATUS.md`
2. Read `docs/planning/roadmap.md` - stop if missing
3. Read `docs/planning/prd.md` for context
4. Update STATUS.md: "Phase: Sprint Planning"

## Sprint Process

**Step 1 - Select Milestone**
If not specified in $ARGUMENTS, ask which milestone.

**Step 2 - Confirm**
List tasks for that milestone.
"I'll create [X] GitHub issues. Proceed?"

**Step 3 - Create Issues**
For each task, run `gh issue create`:

```
Title: [Feature]: [Task]

## Context
Part of: Milestone [X]
Feature: [Name]

## Description
[What needs to be done]

## Acceptance Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] Tests pass

## Technical Notes
- Complexity: [Low/Medium/High]
- Dependencies: [Blocking issues]
```

**Step 4 - Update Roadmap**
Add issue numbers to roadmap.md tasks.

**Step 5 - Update Status**
STATUS.md:
- Phase: Build
- List created issues
- Next: /fix-issue [first issue]

**Step 6 - Summary**
```
Created [X] issues for Milestone 1:
- #12: [Task]
- #13: [Task]

Start with: /fix-issue 12
```
