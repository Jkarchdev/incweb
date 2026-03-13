-- IncWeb Database Schema
-- Run this in your Supabase SQL Editor

-- Table 1: submissions (for final team submissions)
CREATE TABLE IF NOT EXISTS submissions (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  team_name TEXT NOT NULL,
  domain_name TEXT,
  design_data JSONB NOT NULL
);

-- Table 2: saved_designs (for saving/loading work in progress)
CREATE TABLE IF NOT EXISTS saved_designs (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  team_name TEXT NOT NULL UNIQUE,
  design_data JSONB NOT NULL
);

-- Create index on team_name for faster lookups
CREATE INDEX IF NOT EXISTS idx_submissions_team_name ON submissions(team_name);
CREATE INDEX IF NOT EXISTS idx_saved_designs_team_name ON saved_designs(team_name);

-- Enable Row Level Security (but allow all operations for simplicity)
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_designs ENABLE ROW LEVEL SECURITY;

-- Create policies to allow all operations (suitable for event use)
CREATE POLICY "Allow all operations on submissions"
  ON submissions
  FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on saved_designs"
  ON saved_designs
  FOR ALL
  USING (true)
  WITH CHECK (true);
