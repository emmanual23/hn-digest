ALTER TABLE summaries ADD COLUMN quotes jsonb DEFAULT '[]';
ALTER TABLE summaries ADD COLUMN topics jsonb DEFAULT '[]';
