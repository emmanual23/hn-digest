import { StoryWithSummary } from "@/types/digest";
import { StoryMeta } from "./StoryMeta";
import { TakeawayList } from "./TakeawayList";

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
          <div className="border-t border-slate-100 pt-4">
            <TakeawayList takeaways={story.summary.takeaways} />
          </div>
        )}
      </div>
    </article>
  );
}
