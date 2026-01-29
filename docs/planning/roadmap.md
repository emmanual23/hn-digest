# Roadmap: HN Digest

## Milestone 1: Daily Digest (MVP)
**Goal:** A user can visit the site and read today's AI-synthesized HN discussion digest.
**Status:** Not Started

### Features
- [ ] Project Setup
- [ ] F1: Story Fetching
- [ ] F2: Discussion Synthesis
- [ ] F3: Daily Digest Page
- [ ] F5: Story Metadata

### Tasks

#### Project Setup
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| Initialize Next.js 14 project with TypeScript, Tailwind, shadcn/ui | Setup | Low | None |
| Configure Supabase project and environment variables | Setup | Low | None |
| Create database schema (digests, stories, summaries tables) | Data | Low | Supabase config |
| Set up Supabase client utilities (server + browser) | Backend | Low | Supabase config |
| Define TypeScript types for Digest, Story, Summary, HN API | Types | Low | None |

#### F1: Story Fetching
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| Build HN API client (fetchTopStories, fetchItem, fetchComments) | Backend | Medium | Types |
| Build cron route shell (POST /api/cron/generate with auth) | Backend | Low | Supabase client |
| Implement fetch pipeline: create digest → fetch top 30 stories → fetch top 50 comments per story → insert rows | Backend | High | HN client, cron route, schema |
| Add status state machine to digest (pending → fetching → synthesizing → complete/failed) | Backend | Low | Schema |

#### F2: Discussion Synthesis
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| Build LLM client abstraction (src/lib/llm.ts) | Backend | Low | None |
| Write synthesis prompt template (src/lib/prompts.ts) | Backend | Medium | None |
| Implement synthesis step in cron pipeline: send comments → parse takeaways → store summaries | Backend | High | LLM client, prompts, fetch pipeline |
| Add error handling: mark digest failed on LLM error, allow partial success | Backend | Medium | Cron pipeline |

#### F3: Daily Digest Page
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| Build root layout with Header and Footer components | Frontend | Low | Project setup |
| Build DigestHeader component (date, story count) | Frontend | Low | Types |
| Build StoryCard component (title, metadata, takeaways) | Frontend | Medium | Types |
| Build TakeawayList component (renders takeaways with type badges) | Frontend | Low | Types |
| Build StoryMeta component (score, comments, author, HN link) | Frontend | Low | Types |
| Build EmptyState component (no digest available) | Frontend | Low | None |
| Build homepage (src/app/page.tsx) — fetch today's digest, render story cards | Frontend | Medium | All components, schema |
| Build GET /api/digests/today route | Backend | Low | Supabase client, schema |

#### F5: Story Metadata
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| (Included in F1 fetch pipeline and F3 StoryMeta component) | — | — | F1, F3 |

---

## Milestone 2: Archive & Polish
**Goal:** Users can browse past digests. UI is polished and production-ready.
**Status:** Not Started

### Features
- [ ] F4: Digest Archive
- [ ] F8: Sentiment Indicators
- [ ] Production Polish

### Tasks

#### F4: Digest Archive
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| Build GET /api/digests route (paginated list, cursor-based) | Backend | Low | Schema |
| Build GET /api/digests/[date] route | Backend | Low | Schema |
| Build digest/[date]/page.tsx — digest page for any date | Frontend | Medium | StoryCard, DigestHeader |
| Build DigestNav component (previous/next day navigation) | Frontend | Low | None |
| Build ArchiveList component (list of past digest dates) | Frontend | Low | Types |
| Build archive/page.tsx — browse past digests | Frontend | Medium | ArchiveList |

#### F8: Sentiment Indicators
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| Update synthesis prompt to output sentiment classification (agrees/disagrees/divided) | Backend | Low | Prompts |
| Build SentimentBadge component | Frontend | Low | None |
| Add SentimentBadge to StoryCard | Frontend | Low | StoryCard |

#### Production Polish
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| Add meta tags and OpenGraph for SEO | Frontend | Low | Digest pages |
| Add loading states and error boundaries | Frontend | Medium | All pages |
| Configure Vercel cron schedule (vercel.json) | Infra | Low | Cron route |
| Design review — verify adherence to design system | Frontend | Medium | All components |
| Add tests: cron pipeline, API routes, key components | Test | High | All features |

---

## Milestone 3: Engagement (Post-MVP)
**Goal:** Users can subscribe for email delivery and personalize their digest experience.
**Status:** Not Started

### Features
- [ ] F6: Email Delivery
- [ ] F7: Topic Categories
- [ ] F9: User Accounts
- [ ] F10: Topic Preferences
- [ ] F11: Digest Search

### Tasks

#### F6: Email Delivery
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| Create subscribers table (id, email, verified, created_at) | Data | Low | None |
| Build email subscribe API route | Backend | Medium | Schema |
| Build email template for daily digest | Frontend | Medium | None |
| Integrate email provider (Resend or similar) | Backend | Medium | None |
| Add email send step to cron pipeline (after digest complete) | Backend | Medium | Cron pipeline, email provider |
| Build subscribe form on homepage | Frontend | Low | Subscribe API |

#### F7: Topic Categories
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| Update synthesis prompt to output topic tags | Backend | Low | Prompts |
| Add topics column to stories table | Data | Low | Schema |
| Build topic filter UI on digest page | Frontend | Medium | Digest pages |

#### F9: User Accounts
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| Configure Supabase Auth (email/password or magic link) | Backend | Medium | Supabase config |
| Build sign up / login pages | Frontend | Medium | Auth config |
| Add auth middleware for protected routes | Backend | Low | Auth config |

#### F10: Topic Preferences
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| Create user_preferences table | Data | Low | User accounts |
| Build preferences settings page | Frontend | Medium | User accounts |
| Apply topic filtering to digest display | Frontend | Medium | Topic categories, preferences |

#### F11: Digest Search
| Task | Type | Complexity | Dependencies |
|------|------|------------|--------------|
| Add full-text search index on stories.title and summaries.takeaways | Data | Medium | Schema |
| Build search API route | Backend | Medium | Search index |
| Build search page with results | Frontend | Medium | Search API |
