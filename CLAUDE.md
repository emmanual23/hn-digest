# CLAUDE.md - Project Constitution

## 1. PROJECT CONTEXT

**Project:** HN Digest
**Description:** Synthesizes discussions from top Hacker News threads into daily digestible summaries
**Owner:** [Your name]

---

## 2. TECH STACK

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Hosting:** Vercel

---

## 3. CODING RULES

### General
- Always run lint before committing
- Use environment variables for secrets (never hardcode)
- Match existing patterns in the codebase before introducing new ones

### File Organization
- Components: `src/components/`
- Pages/Routes: `src/app/`
- Utilities: `src/lib/`
- Types: `src/types/`
- API routes: `src/app/api/`

### Naming Conventions
- Components: PascalCase (`UserProfile.tsx`)
- Utilities: camelCase (`formatDate.ts`)
- Constants: UPPER_SNAKE_CASE
- Database tables: snake_case

---

## 4. TESTING STRATEGY

### Philosophy
Tests verify **expected behavior**, not implementation details. Focus on user-facing outcomes.

### Testing Pyramid
```
        /\
       /E2E\        ← Few: Critical paths only
      /------\
     /Component\    ← Some: Key interactions
    /------------\
   / Integration  \  ← More: API & data layer
  /----------------\
 /      Unit        \ ← Many: Business logic
/____________________\
```

### What to Test (Priority Order)
1. **Always test:** Business logic, API endpoints, form validation, auth logic
2. **Test when valuable:** Complex component interactions, state management
3. **Skip tests for:** Styling, trivial getters, third-party wrappers

### Test Commands
- `npm run test` — Must pass before commit
- `npm run test:watch` — During development
- `npm run test:coverage` — Check coverage (no minimum required)

---

## 5. ASSUMPTION PROTOCOL

Before writing any code, you (Claude) must:

1. **State your assumptions** about:
   - What the user wants (behavior, not implementation)
   - Current codebase patterns you'll follow
   - Dependencies or APIs involved
   - Edge cases you'll handle (or ignore)

2. **Wait for confirmation** before proceeding

3. **If uncertain**, ask ONE clarifying question at a time

This is mandatory. Do not skip this step.

---

## 6. GIT & GITHUB WORKFLOW

### Commit Messages
Format: `type: description`

Types:
- `feat:` new feature
- `fix:` bug fix
- `refactor:` code change that doesn't fix bug or add feature
- `docs:` documentation
- `test:` adding tests
- `chore:` maintenance

### Branch Naming
- Features: `feat/short-description`
- Fixes: `fix/issue-number-short-description`

### Pull Requests
- Reference issue number: "Fixes #123"
- Keep PRs focused on a single change
- Ensure all tests pass before requesting review

### PR Review Checklist
Before merging any PR, verify:

**Functionality**
- [ ] Code does what the issue/feature requires
- [ ] Edge cases handled
- [ ] Error states handled gracefully

**Code Quality**
- [ ] Follows existing patterns
- [ ] No hardcoded secrets
- [ ] No debug logs or commented code

**Testing**
- [ ] Tests pass (`npm run test`)
- [ ] New logic has test coverage

**Security**
- [ ] User input validated
- [ ] Auth checks in place where needed

**Documentation**
- [ ] Complex logic commented
- [ ] ADR created for significant decisions

### Git Operations
You (Claude) should handle routine git operations:
- Creating branches
- Writing commit messages based on changes
- Creating PRs via `gh pr create`

---

## 7. PLANNING DOCUMENTS

### Document Hierarchy
```
docs/
├── planning/
│   ├── STATUS.md        # Current state (always read first)
│   ├── TECH-DEBT.md     # Technical debt tracker
│   ├── research.md      # Market research
│   ├── prd.md           # Product requirements
│   ├── architecture.md  # Technical structure
│   └── roadmap.md       # Milestones and tasks
└── decisions/
    └── ADR-XXX-*.md     # Architecture Decision Records
```

### Reading Order
When starting any work:
1. Always read `STATUS.md` first
2. Read `prd.md` for product context
3. Read `architecture.md` for technical structure
4. Read `roadmap.md` for current priorities

### Keeping Documents Updated
- Update `STATUS.md` after every significant action
- Update `roadmap.md` when issues are created or completed
- Update `TECH-DEBT.md` when taking shortcuts or identifying debt
- Create ADRs in `docs/decisions/` for significant technical decisions

---

## 8. SESSION CONTINUITY

### Status Tracking
- Project status lives in `docs/planning/STATUS.md`
- Always read this file at session start
- Update after completing any significant step
- Update before ending a session

### When Starting a Session
1. Read `docs/planning/STATUS.md`
2. Summarize current state to the user
3. Ask if they want to continue where they left off

### When Ending a Session
Update `docs/planning/STATUS.md` with:
- What was accomplished
- Exactly where work stopped
- Any blockers or open questions
- Clear next steps

---

## 9. DESIGN SYSTEM

### Philosophy
Professional, information-dense, minimal. Think "Financial Times meets Stripe."
NOT: flashy, playful, marketing-heavy, or consumer-app aesthetic.

### Color Palette
| Role | Value | Usage |
|------|-------|-------|
| Background | `white` / `slate-50` | Page backgrounds |
| Surface | `white` | Cards, modals |
| Border | `slate-200` | Subtle divisions |
| Text Primary | `slate-900` | Headings, body |
| Text Secondary | `slate-500` | Captions, labels |
| Accent | `slate-600` | Primary buttons, links |
| Accent Hover | `slate-700` | Button hover states |
| Success | `emerald-600` | Success states |
| Warning | `amber-600` | Warning states |
| Error | `red-600` | Error states |

### Typography
- **Font:** Inter (system fallback: -apple-system, sans-serif)
- **Scale:** 12px (caption) → 14px (body) → 16px (lead) → 20px (h3) → 24px (h2) → 30px (h1)
- **Line height:** 1.5 for body, 1.2 for headings
- **Font weights:** 400 (normal), 500 (medium), 600 (semibold)

### Spacing
- Base unit: 4px
- Use Tailwind spacing: `p-2` (8px), `p-4` (16px), `p-6` (24px)
- Consistent padding inside cards: `p-6`
- Gap between sections: `space-y-8`

### Components
- **Buttons:** Subtle, not loud. Primary = solid slate. Secondary = outline.
- **Cards:** White background, `border border-slate-200`, `rounded-lg`, `shadow-sm`
- **Tables:** Clean, minimal borders, hover states on rows
- **Forms:** Simple labels above inputs, clear focus states
- **Icons:** Lucide icons only, 20px default size, stroke-width 1.5

### FORBIDDEN
- Hero sections with large images
- Gradient backgrounds
- Colored section backgrounds
- Decorative illustrations
- Emojis in UI (okay in content)
- Marketing-style CTAs
- Excessive animations
- Card shadows darker than `shadow-sm`
- More than one accent color

---

## 10. QUICK REFERENCE

### Commands Available
**Discovery:** `/research`, `/prd`, `/architecture`, `/adr`, `/roadmap`, `/sprint`
**Build:** `/plan`, `/build`, `/fix-issue`, `/audit`, `/security-check`, `/deps`, `/design-check`, `/pre-release`
**Session:** `/status`, `/checkpoint`, `/resume-work`
**Utility:** `/onboard`, `/challenge`

### Key Files
- `docs/planning/STATUS.md` - Current project state
- `docs/planning/TECH-DEBT.md` - Technical debt tracker
- `docs/planning/prd.md` - Product requirements
- `docs/planning/architecture.md` - Technical structure
- `docs/planning/roadmap.md` - Implementation plan
- `docs/decisions/` - Architecture Decision Records
