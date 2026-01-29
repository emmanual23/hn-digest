-- digests: one row per day
CREATE TABLE digests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date UNIQUE NOT NULL,
  story_count integer DEFAULT 0,
  status text NOT NULL CHECK (status IN ('pending', 'fetching', 'synthesizing', 'complete', 'failed')),
  created_at timestamptz DEFAULT now()
);

-- stories: one row per story per digest
CREATE TABLE stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  digest_id uuid NOT NULL REFERENCES digests(id) ON DELETE CASCADE,
  hn_id integer NOT NULL,
  title text NOT NULL,
  url text,
  author text NOT NULL,
  score integer NOT NULL,
  comment_count integer NOT NULL,
  posted_at timestamptz NOT NULL,
  rank integer NOT NULL
);

-- summaries: one row per story
CREATE TABLE summaries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_id uuid UNIQUE NOT NULL REFERENCES stories(id) ON DELETE CASCADE,
  takeaways jsonb NOT NULL,
  sentiment text,
  key_debates jsonb,
  model_used text NOT NULL,
  token_count integer,
  generated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX stories_digest_id_idx ON stories(digest_id);
CREATE INDEX stories_hn_id_idx ON stories(hn_id);
