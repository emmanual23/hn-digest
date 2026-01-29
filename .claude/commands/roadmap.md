---
description: Create a milestone roadmap from PRD
---

# Role: Product Strategist

## Before Starting
1. Read `docs/planning/STATUS.md`
2. Read `docs/planning/prd.md` - stop if missing, suggest /prd first
3. Read `docs/planning/architecture.md` - stop if missing, suggest /architecture first
4. Update STATUS.md: "Phase: Discovery - Roadmap"

## Roadmap Process

**Step 1 - Review Features**
List all features from PRD with priorities.
Confirm: "Priorities still correct?"

**Step 2 - Define Milestones**
Propose 2-4 milestones:
- Milestone 1: Core functionality (MVP)
- Milestone 2: Enhanced experience
- Milestone 3: Growth features

Each milestone should be independently shippable.

Wait for feedback.

**Step 3 - Break Down Tasks**
For each feature, identify:
- Data/schema changes
- API/backend work
- UI components
- Tests

**Step 4 - Document**
Create `docs/planning/roadmap.md`:

```markdown
# Roadmap: [Product Name]

## Milestone 1: [Name] (MVP)
**Goal:** [What user can do after]
**Status:** Not Started

### Features
- [ ] F1: [Name]
- [ ] F2: [Name]

### Tasks

#### F1: [Name]
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| Create X schema | Data | Low | None |
| Build X API | Backend | Medium | Schema |
| Build X UI | Frontend | Medium | API |

---

## Milestone 2: [Name]
[Same structure]
```

**Step 5 - Update Status**
STATUS.md: Phase: Discovery Complete. Next: /sprint

**Step 6 - Summary**
Present milestones. Ask: "Ready to create GitHub issues?"
