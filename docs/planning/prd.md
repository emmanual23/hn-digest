# PRD: HN Digest

## Overview
**Problem:** Engineers and tech professionals can't keep up with Hacker News — hundreds of stories and thousands of comments daily create information overload.
**Solution:** A daily digest that synthesizes HN comment threads into key takeaways, surfacing what the community actually thinks about each top story.
**Target User:** Time-constrained software engineers and tech professionals who want to stay informed on HN discussions without reading every thread.

## Goals
1. Deliver a daily, scannable digest of the top HN discussions with AI-synthesized takeaways
2. Help users understand community sentiment and key debates in under 5 minutes per day
3. Differentiate from competitors by focusing on discussion synthesis, not article summarization

## Non-Goals
- Real-time or live HN feed
- Article content summarization (competitors cover this)
- Social features (comments, likes, sharing)
- Native mobile app
- Replacing HN — we complement it

## Features

### Core (MVP)

| Feature | Description | User Story | Priority |
|---------|-------------|------------|----------|
| F1: Story Fetching | Fetch top 20-30 stories daily from the HN API, including comment trees | As a user, I want to see today's most discussed HN stories without visiting HN | P0 |
| F2: Discussion Synthesis | Use LLM to synthesize each story's comment thread into 2-3 key takeaways (main arguments, counterpoints, insider insights) | As a user, I want to understand what the community thinks about a story in 30 seconds | P0 |
| F3: Daily Digest Page | Single page showing today's digest — story title, score, comment count, discussion summary, link to original thread | As a user, I want one page I visit each morning to catch up on HN | P0 |
| F4: Digest Archive | Browse previous daily digests by date | As a user, I want to read digests I missed on previous days | P0 |
| F5: Story Metadata | Display HN score, comment count, post time, author, and direct link to HN thread | As a user, I want to quickly gauge story importance and jump to the original thread if interested | P0 |

### Secondary (Post-MVP)

| Feature | Description | Priority |
|---------|-------------|----------|
| F6: Email Delivery | Subscribe with email to receive the daily digest each morning | P1 |
| F7: Topic Categories | AI-tagged categories (AI/ML, DevTools, Startups, Culture, etc.) with filtering | P1 |
| F8: Sentiment Indicators | Visual indicator showing community consensus: agrees, disagrees, divided | P1 |
| F9: User Accounts | Sign up/login via Supabase Auth for personalization | P2 |
| F10: Topic Preferences | Logged-in users can set preferred topics to highlight | P2 |
| F11: Digest Search | Full-text search across past digests and discussion summaries | P2 |

## User Flows

### Primary: Read Today's Digest
1. User visits the homepage
2. System displays today's digest with the top stories and discussion summaries
3. User scans the list, reads takeaways for stories that interest them
4. User optionally clicks through to the original HN thread for deeper reading

### Secondary: Browse Archive
1. User navigates to the archive page
2. System shows a calendar/list of past digest dates
3. User selects a date
4. System displays that day's digest

### Tertiary: Subscribe to Email (Post-MVP)
1. User enters email on the homepage
2. System confirms subscription
3. User receives digest via email each morning

## Data Model (High Level)

- **digests** — One row per day (`id`, `date`, `created_at`)
- **stories** — One row per story per digest (`id`, `digest_id`, `hn_id`, `title`, `url`, `score`, `comment_count`, `author`, `posted_at`)
- **summaries** — One row per story (`id`, `story_id`, `takeaways`, `sentiment`, `generated_at`, `model_used`)

## Technical Considerations

- **HN API:** Free, no auth required. Fetch `/topstories.json` and individual item endpoints for comments. Rate-limited but sufficient for daily batch.
- **LLM Cost:** Primary cost driver. Estimate ~20-30 stories/day x ~100-500 comments each. Strategy: fetch top ~50 comments per story (sorted by score) to limit token usage while preserving quality.
- **Cron Job:** Daily fetch + synthesis job. Can run as a Vercel cron or external scheduler.
- **Caching:** Store synthesized digests in Supabase — no re-generation needed once a day's digest is created.

## Success Metrics
- [ ] Daily digest generated reliably by 8am ET
- [ ] Discussion summaries rated as "useful" by >70% of early users
- [ ] Users report catching up on HN in <5 minutes
- [ ] >50% of visitors return within a week
- [ ] <$5/day LLM cost for MVP volume

## Open Questions
1. How many comments per story should we feed to the LLM? (Top 50 by score? Full thread?)
2. Should the daily job run once or update throughout the day as stories evolve?
3. What LLM to use? (GPT-4o-mini for cost efficiency vs. Claude for quality)
