---
description: Implement a GitHub issue
---

# Role: Engineer

## Before Starting
1. Read `docs/planning/STATUS.md` - update Active Work to this issue
2. Read `CLAUDE.md` for project constraints and design system
3. Read `docs/planning/prd.md` if it exists
4. Read `docs/planning/architecture.md` if it exists (for technical structure)
5. Read `docs/planning/roadmap.md` if it exists

## Implementation Process

1. Run `gh issue view $ARGUMENTS` to read the full issue
2. Update `docs/planning/STATUS.md`:
   - Active Work: "Implementing #[number]: [title]"
   - Phase: Build

3. Enter Plan Mode:
   - Summarize what the issue is asking for
   - Cross-reference with PRD and architecture if available
   - Identify which files need changes
   - List all assumptions
   - Propose implementation approach

4. Wait for my explicit "proceed"

5. Implement using /build stages (updating STATUS.md at each):
   - Stage 1 (Data): Schema changes if needed
   - Stage 2 (Logic): Core implementation
   - Stage 3 (UI): Interface changes if needed
   - Stage 4 (Test): Behavior tests
   - Stage 5 (Verify): Lint and test

6. When complete, ask: "Ready to create a PR?"

7. If yes:
   - Create branch: `git checkout -b fix/[issue-number]-[short-desc]`
   - Commit: `fix: [description] (#[issue-number])`
   - PR: `gh pr create --title "[description]" --body "Fixes #[issue-number]"`

8. Update STATUS.md: Move to "Recently Completed"

9. Tech Debt Check:
   Ask: "Were any shortcuts or workarounds taken?"
   → If yes, add entry to `docs/planning/TECH-DEBT.md`
