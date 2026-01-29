# Product Research: HN Digest

## Problem Statement

Hacker News generates hundreds of stories and thousands of comments daily. Engineers, founders, and tech professionals want to stay informed but face information overload — leading to FOMO, content backlog burnout, and lost productivity (some report losing a full day per week to tech feeds). Existing HN interfaces surface stories but don't synthesize the *discussions*, which is where the real value lies.

## Target User

**Primary:** Software engineers and tech professionals who read Hacker News semi-regularly but don't have time to follow every thread.

- Age 25-45, knowledge workers in tech
- Value staying informed on industry trends, tools, and debates
- Time-constrained: want signal, not noise
- Care about *community perspective* (comments), not just headlines

**Secondary:** Tech leads, CTOs, and founders who need to stay current without deep-diving into every thread.

## Competitive Landscape

| Competitor | What It Does | Strengths | Weaknesses | Gap |
|------------|-------------|-----------|------------|-----|
| [HN Daily](https://www.daemonology.net/hn-daily/) | Top 10 stories per day | Simple, reliable, long-running | Headlines only, no summaries, no discussion synthesis | No comment/discussion insight |
| [HN Summary (betacat.io)](https://hackernews.betacat.io/) | AI summaries of stories | Summarizes articles via ChatGPT | Summarizes the *article*, not the *discussion* | No comment synthesis |
| [Brutalist Report](https://brutalist.report/) | Aggregates headlines from many sources | Clean UI, multi-source | No summaries at all, just links | No synthesis of any kind |
| [TLDR Newsletter](https://tldr.tech/) | Daily tech newsletter | Huge audience (4M+), well-curated | Broad tech coverage, not HN-specific, no discussion synthesis | Not HN-focused, no comment analysis |
| [HackerNews Summarizer](https://theresanaiforthat.com/ai/hackernews-summarizer/) (Chrome ext) | AI summary per article | Inline in HN UI | Per-article, not a digest; no discussion synthesis | Not a daily digest format |
| [hn_summary (Telegram)](https://github.com/jiggy-ai/hn_summary) | Sends story summaries to Telegram | Automated delivery | Article summaries only, niche channel | No comment synthesis |

## Differentiation Opportunity

**Every existing tool summarizes the *article*. None synthesize the *discussion*.**

HN Digest's core differentiator: summarize what the HN community actually *said* about each story — the debates, the counterpoints, the insider knowledge shared in comments. This is the unique value of Hacker News that no competitor captures.

Key differentiators:
1. **Discussion synthesis** — Extract key themes, debates, and insights from comment threads
2. **Daily digest format** — One page/email per day, not a firehose
3. **Sentiment and consensus** — Show where the community agrees/disagrees
4. **Professional, information-dense UI** — Not another marketing-heavy newsletter

## Key Risks & Assumptions

- [ ] HN API provides sufficient comment data to synthesize meaningfully
- [ ] AI can reliably extract coherent themes from unstructured comment threads
- [ ] Users value discussion synthesis enough to use this over existing tools
- [ ] Cost of LLM API calls for summarizing hundreds of comment threads daily is sustainable
- [ ] HN's terms of service allow automated scraping/summarization of comments

## Recommendation

**Proceed.** The gap is clear — no existing tool synthesizes HN discussions. The problem (information overload) is well-validated by the HN community itself. The tech stack (Next.js + Supabase + LLM APIs) is well-suited.

**Suggested MVP scope:**
- Fetch top 20-30 HN stories daily via the HN API
- Synthesize comment threads into 2-3 key takeaways per story
- Present as a clean daily digest web page
- Optional: email delivery

**Key MVP question:** How deep to go on comment synthesis (top-level only vs. full thread analysis) — this affects both quality and LLM cost.
