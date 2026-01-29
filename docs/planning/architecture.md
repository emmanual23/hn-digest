# Technical Architecture: HN Digest

## Overview
HN Digest is a Next.js 14 App Router application that runs a daily cron job to fetch top Hacker News stories, synthesizes their comment threads via an LLM, and serves the results as server-rendered daily digest pages. Data is stored in Supabase (PostgreSQL).

## Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (post-MVP)
- **Hosting:** Vercel
- **LLM:** TBD (OpenAI or Anthropic API)
- **External API:** Hacker News API (https://hacker-news.firebaseio.com/v0)

## Data Model

### Tables
| Table | Purpose | Key Columns |
|-------|---------|-------------|
| `digests` | One row per day | `id`, `date`, `story_count`, `status`, `created_at` |
| `stories` | One row per story per digest | `id`, `digest_id`, `hn_id`, `title`, `url`, `author`, `score`, `comment_count`, `posted_at`, `rank` |
| `summaries` | One row per story | `id`, `story_id`, `takeaways`, `sentiment`, `key_debates`, `model_used`, `token_count`, `generated_at` |

### Relationships
```
digests 1──* stories 1──1 summaries
```

### Schema Details

#### digests
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| date | date | UNIQUE, NOT NULL |
| story_count | integer | DEFAULT 0 |
| status | text | NOT NULL, CHECK (status IN ('pending', 'fetching', 'synthesizing', 'complete', 'failed')) |
| created_at | timestamptz | DEFAULT now() |

#### stories
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| digest_id | uuid | FK → digests.id, NOT NULL |
| hn_id | integer | NOT NULL |
| title | text | NOT NULL |
| url | text | NULLABLE (Ask HN posts have no URL) |
| author | text | NOT NULL |
| score | integer | NOT NULL |
| comment_count | integer | NOT NULL |
| posted_at | timestamptz | NOT NULL |
| rank | integer | NOT NULL |

#### summaries
| Column | Type | Constraints |
|--------|------|-------------|
| id | uuid | PK, default gen_random_uuid() |
| story_id | uuid | FK → stories.id, UNIQUE, NOT NULL |
| takeaways | jsonb | NOT NULL |
| sentiment | text | NULLABLE |
| key_debates | jsonb | NULLABLE |
| model_used | text | NOT NULL |
| token_count | integer | NULLABLE |
| generated_at | timestamptz | DEFAULT now() |

### Indexes
- `digests_date_idx` ON digests(date) — unique, primary lookup
- `stories_digest_id_idx` ON stories(digest_id) — fetch stories for a digest
- `stories_hn_id_idx` ON stories(hn_id) — dedup check
- `summaries_story_id_idx` ON summaries(story_id) — unique, join to story

### JSONB Structures

**takeaways:**
```json
[
  { "point": "Most commenters agree that...", "type": "consensus" },
  { "point": "A counterpoint raised was...", "type": "counterpoint" },
  { "point": "Several engineers noted...", "type": "insight" }
]
```

**key_debates:**
```json
["performance vs readability", "whether this replaces X"]
```

## API Routes

### Digests (Public)
| Method | Route | Purpose | Auth |
|--------|-------|---------|------|
| GET | `/api/digests` | List digests (paginated, newest first) | Public |
| GET | `/api/digests/today` | Get today's digest with stories + summaries | Public |
| GET | `/api/digests/[date]` | Get digest by date with stories + summaries | Public |

### Cron (Internal)
| Method | Route | Purpose | Auth |
|--------|-------|---------|------|
| POST | `/api/cron/generate` | Trigger daily fetch + synthesis pipeline | Cron secret (`CRON_SECRET` env var) |

### Response Shapes

**GET /api/digests/today, /api/digests/[date]:**
```json
{
  "digest": {
    "id": "uuid",
    "date": "2026-01-29",
    "status": "complete",
    "story_count": 25,
    "stories": [
      {
        "id": "uuid",
        "hn_id": 12345,
        "title": "Story title",
        "url": "https://...",
        "author": "username",
        "score": 342,
        "comment_count": 187,
        "posted_at": "2026-01-29T08:00:00Z",
        "rank": 1,
        "summary": {
          "takeaways": [
            { "point": "...", "type": "consensus" },
            { "point": "...", "type": "counterpoint" }
          ],
          "sentiment": "divided",
          "key_debates": ["performance vs readability"]
        }
      }
    ]
  }
}
```

**GET /api/digests:**
```json
{
  "digests": [
    { "id": "uuid", "date": "2026-01-29", "story_count": 25, "status": "complete" }
  ],
  "next_cursor": "2026-01-20"
}
```

### Cron Pipeline (POST /api/cron/generate)
1. Create `digests` row with status `pending`
2. Set status to `fetching`
3. Fetch `/v0/topstories.json` → take top 30 by score
4. For each story: fetch item details + top 50 comments (by score, recursive)
5. Insert `stories` rows
6. Set status to `synthesizing`
7. For each story: send comments to LLM with synthesis prompt → store `summaries` row
8. Update `digests.story_count` and set status to `complete`
9. On any error: set status to `failed`, log error

### Cron Auth
Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`. The route handler validates this header before proceeding.

## Component Structure

### Pages
```
src/app/
├── page.tsx                        # Homepage — shows today's digest
├── digest/
│   └── [date]/
│       └── page.tsx                # Digest for a specific date
├── archive/
│   └── page.tsx                    # Browse past digests
├── api/
│   ├── digests/
│   │   ├── route.ts                # GET /api/digests
│   │   ├── today/
│   │   │   └── route.ts            # GET /api/digests/today
│   │   └── [date]/
│   │       └── route.ts            # GET /api/digests/[date]
│   └── cron/
│       └── generate/
│           └── route.ts            # POST /api/cron/generate
└── layout.tsx                      # Root layout
```

### Shared Components
| Component | Purpose | Used By |
|-----------|---------|---------|
| `Header` | Site header with nav | layout.tsx |
| `Footer` | Site footer | layout.tsx |
| `DigestHeader` | Date display, story count, status | page.tsx, digest/[date] |
| `StoryCard` | Single story with metadata + takeaways | page.tsx, digest/[date] |
| `StoryMeta` | Score, comments, author, time, HN link | StoryCard |
| `TakeawayList` | Renders takeaway points with type badges | StoryCard |
| `DigestNav` | Previous/next day navigation | page.tsx, digest/[date] |
| `ArchiveList` | List of past digest dates | archive/page.tsx |
| `EmptyState` | Shown when no digest available | page.tsx, digest/[date] |

### Utilities
```
src/lib/
├── hn.ts                           # HN API client (fetchTopStories, fetchComments)
├── llm.ts                          # LLM client (synthesizeComments)
├── supabase/
│   ├── client.ts                   # Browser Supabase client
│   └── server.ts                   # Server Supabase client
├── prompts.ts                      # LLM prompt templates
└── utils.ts                        # Date formatting, helpers
```

### Types
```
src/types/
├── digest.ts                       # Digest, Story, Summary, Takeaway types
└── hn.ts                           # HN API response types (HNItem, HNComment)
```

### Data Fetching Pattern
- All digest pages use **Server Components** with direct Supabase queries
- No client-side state management needed for MVP (read-only content)
- API routes exist for potential future clients (email service, mobile app) but pages query Supabase directly via server client
- Cron route is the only write path

## Feature → Component Mapping

| Feature | Pages | Components | API Routes | Tables |
|---------|-------|------------|------------|--------|
| F1: Story Fetching | — | — | `/api/cron/generate` | `digests`, `stories` |
| F2: Discussion Synthesis | — | — | `/api/cron/generate` | `summaries` |
| F3: Daily Digest Page | `/`, `/digest/[date]` | DigestHeader, StoryCard, TakeawayList, StoryMeta, DigestNav | `/api/digests/today`, `/api/digests/[date]` | all |
| F4: Digest Archive | `/archive` | ArchiveList, DigestHeader | `/api/digests` | `digests` |
| F5: Story Metadata | (part of F3) | StoryMeta | (included in digest endpoints) | `stories` |

## Key Technical Decisions

1. **Server Components over client-side fetching** — Content is static once generated, no interactivity needed. Better SEO, simpler code.
2. **Single cron endpoint** — One pipeline handles fetch + synthesis sequentially. Simpler than separate jobs for MVP.
3. **JSONB for takeaways** — Flexible structure without needing a separate takeaways table. Easy to iterate on format.
4. **Top 50 comments per story** — Balances LLM cost with discussion coverage. Can adjust later.
5. **Cursor-based pagination for archive** — Date-based cursor is natural for chronological data.
