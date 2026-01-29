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
| # | Task | Type | Complexity | Dependencies |
|---|------|------|------------|--------------|
| #1 | Initialize Next.js 14 project with TypeScript, Tailwind, shadcn/ui | Setup | Low | None |
| #2 | Configure Supabase project and environment variables | Setup | Low | None |
| #3 | Create database schema (digests, stories, summaries tables) | Data | Low | #2 |
| #4 | Set up Supabase client utilities (server + browser) | Backend | Low | #2 |
| #5 | Define TypeScript types for Digest, Story, Summary, HN API | Types | Low | None |

#### F1: Story Fetching
| # | Task | Type | Complexity | Dependencies |
|---|------|------|------------|--------------|
| #6 | Build HN API client (fetchTopStories, fetchItem, fetchComments) | Backend | Medium | #5 |
| #7 | Build cron route shell (POST /api/cron/generate with auth) | Backend | Low | #4 |
| #8 | Implement fetch pipeline (stories + comments → database) | Backend | High | #6, #7, #3 |
| #9 | Add status state machine to digest lifecycle | Backend | Low | #3 |

#### F2: Discussion Synthesis
| # | Task | Type | Complexity | Dependencies |
|---|------|------|------------|--------------|
| #10 | Build LLM client abstraction (src/lib/llm.ts) | Backend | Low | None |
| #11 | Write synthesis prompt template (src/lib/prompts.ts) | Backend | Medium | None |
| #12 | Implement synthesis step in cron pipeline | Backend | High | #10, #11, #8 |
| #13 | Add error handling — partial success and failure recovery | Backend | Medium | #12 |

#### F3: Daily Digest Page
| # | Task | Type | Complexity | Dependencies |
|---|------|------|------------|--------------|
| #14 | Build root layout with Header and Footer components | Frontend | Low | #1 |
| #15 | Build StoryCard, TakeawayList, and StoryMeta components | Frontend | Medium | #5 |
| #16 | Build homepage — today's digest page with EmptyState | Frontend | Medium | #14, #15, #3, #4 |
| #17 | Build GET /api/digests/today route | Backend | Low | #4, #3 |

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
