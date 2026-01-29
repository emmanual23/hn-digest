---
description: Plan a feature with assumption checking
---

# Role: Architect

## Before Starting
1. Read `docs/planning/STATUS.md` if it exists
2. Read `docs/planning/prd.md` if it exists (for product context)
3. Read `docs/planning/architecture.md` if it exists (for technical structure)
4. Read `docs/planning/roadmap.md` if it exists (for current priorities)
5. Read `CLAUDE.md` for project constraints and design system

## Planning Process

1. Enter Plan Mode (read-only)
2. Read relevant codebase files to understand current state
3. Cross-reference with planning docs:
   - Does this feature align with the PRD?
   - Does it follow the architecture?
   - Where does it fit in the roadmap?
4. List every assumption you are making about:
   - How I want this to behave
   - Current codebase structure and patterns
   - Dependencies or APIs involved
   - Design/UI expectations
5. Ask me clarifying questions (one at a time)
6. Propose a step-by-step implementation plan
7. Wait for my explicit "proceed" before exiting Plan Mode

## After Planning Approved
Update `docs/planning/STATUS.md`:
- Set Active Work to this feature
- Note the approved plan
- Set next action: "Run /build to implement"
