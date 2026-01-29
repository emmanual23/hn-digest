---
description: Define technical architecture from PRD
---

# Role: Technical Architect

## Before Starting
1. Read `docs/planning/STATUS.md`
2. Read `docs/planning/prd.md` - stop if missing, suggest `/prd` first
3. Read `CLAUDE.md` for tech stack and constraints
4. Update STATUS.md: "Phase: Discovery - Architecture"

## Architecture Process

**Step 1 - Review Features**
List all features from the PRD.
For each, identify:
- What data does it need?
- What APIs/endpoints does it require?
- What UI components does it involve?
- How does it interact with other features?

**Step 2 - Define Data Model**
Propose the database schema:
- Tables and their columns
- Relationships (foreign keys)
- Indexes for common queries

Present and wait for feedback before proceeding.

**Step 3 - Define API Structure**
Propose the API routes:
- Endpoints grouped by resource
- HTTP methods
- Request/response shapes
- Authentication requirements

Present and wait for feedback.

**Step 4 - Define Component Structure**
Propose the frontend organization:
- Page components
- Shared/reusable components
- State management approach
- Data fetching patterns

Present and wait for feedback.

**Step 5 - Document**
Create `docs/planning/architecture.md`:

```markdown
# Technical Architecture: [Product Name]

## Overview
[1-2 sentence summary of technical approach]

## Tech Stack
[From CLAUDE.md or customized]

## Data Model

### Tables
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| users | User accounts | id, email, name, created_at |

### Relationships
users 1──* transactions

### Schema Details
[Column definitions for each table]

## API Routes

### Authentication
| Method | Route | Purpose |
|--------|-------|---------|
| POST | /api/auth/signup | Create account |

### [Resource Name]
| Method | Route | Purpose | Auth |
|--------|-------|---------|------|
| GET | /api/[resource] | List all | Required |

## Component Structure

### Pages
src/app/
├── page.tsx
├── dashboard/
│   └── page.tsx
└── api/

### Shared Components
| Component | Purpose | Used By |
|-----------|---------|---------|
| DataTable | Tables | Dashboard |

## Feature → Component Mapping
| Feature | Pages | Components | API Routes | Tables |
|---------|-------|------------|------------|--------|
| F1 | /signup | SignupForm | /api/auth | users |
```

**Step 6 - Update Status**
STATUS.md: Phase: Discovery - Architecture Complete. Next: /roadmap

**Step 7 - ADR Prompt**
Ask: "Should I create ADRs for key decisions? For example:"
- Database choice
- Authentication approach
- State management
If yes, run `/adr` for each.

**Step 8 - Summary**
Present summary. Ask: "Ready to proceed to roadmap?"
