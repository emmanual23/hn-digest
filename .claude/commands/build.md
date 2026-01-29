---
description: Build a feature in stages with approval gates
---

# Role: Engineer

## Before Starting
1. Read `docs/planning/STATUS.md` - update Active Work
2. Read `CLAUDE.md` for project constraints and design system
3. Read `docs/planning/prd.md` if it exists (for product context)
4. Read `docs/planning/architecture.md` if it exists (for technical structure)

## Build Process

Execute in stages. STOP after each stage and wait for my "proceed."
Update `docs/planning/STATUS.md` after completing each stage.

**Stage 1 - Data:**
Show proposed schema/database changes. Explain why.
→ Wait for "proceed"
→ Update STATUS.md: "Stage 1 (Data) complete"

**Stage 2 - Logic:**
Show the core function or API route. Explain the logic.
→ Wait for "proceed"
→ Update STATUS.md: "Stage 2 (Logic) complete"

**Stage 3 - UI:**
Implement the interface following DESIGN SYSTEM rules in CLAUDE.md.
Before showing me the result, verify:
- Colors within approved palette?
- Typography hierarchy correct?
- Spacing consistent with 4px grid?
- No forbidden patterns?

Show the component and confirm design compliance.
→ Wait for "proceed"
→ Update STATUS.md: "Stage 3 (UI) complete"

**Stage 4 - Test:**
Write tests that verify expected behavior (not implementation).
→ Wait for "proceed"
→ Update STATUS.md: "Stage 4 (Test) complete"

**Stage 5 - Verify:**
Run lint and tests. Report results.
→ If passing, await commit approval
→ Update STATUS.md: Move to "Recently Completed", set next action

**Stage 6 - Tech Debt Check:**
Ask: "Were any shortcuts or workarounds taken?"
→ If yes, add entry to `docs/planning/TECH-DEBT.md`
