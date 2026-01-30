import { StoryWithSummary } from "@/types/digest";
import { StoryMeta } from "./StoryMeta";
import { TakeawayList } from "./TakeawayList";
import { SentimentBadge } from "./SentimentBadge";
import { QuoteBlock } from "./QuoteBlock";

interface StoryCardProps {
  story: StoryWithSummary;
}

export function StoryCard({ story }: StoryCardProps) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold leading-snug text-slate-900">
            {story.url ? (
              <a
                href={story.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-600"
              >
                {story.title}
              </a>
            ) : (
              story.title
            )}
          </h3>
          <StoryMeta
            score={story.score}
            commentCount={story.comment_count}
            author={story.author}
            postedAt={story.posted_at}
            hnId={story.hn_id}
          />
        </div>

        {story.summary && (
          <div className="border-t border-slate-100 pt-4 space-y-3">
            <div className="flex items-center gap-2">
              <SentimentBadge sentiment={story.summary.sentiment} />
              {story.summary.topics?.length > 0 && (
                <div className="flex gap-1">
                  {story.summary.topics.map((topic) => (
                    <span
                      key={topic}
                      className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <TakeawayList takeaways={story.summary.takeaways} />
            {story.summary.quotes?.length > 0 && (
              <QuoteBlock quotes={story.summary.quotes} />
            )}
            {story.summary.key_debates && story.summary.key_debates.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Debates
                </h4>
                {story.summary.key_debates.map((debate, i) => (
                  <div key={i} className="rounded border border-slate-100 p-3 text-sm">
                    <p className="font-medium text-slate-700">{debate.topic}</p>
                    <div className="mt-1 grid grid-cols-2 gap-2 text-xs text-slate-500">
                      <div>
                        <span className="font-medium text-emerald-600">For:</span>{" "}
                        {debate.for}
                      </div>
                      <div>
                        <span className="font-medium text-amber-600">Against:</span>{" "}
                        {debate.against}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
