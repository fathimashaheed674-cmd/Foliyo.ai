/*
  # Create Foliyo Portfolio Schema

  1. New Tables
    - `portfolios`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `username` (text, unique slug for public URLs)
      - `name` (text)
      - `title` (text, professional title)
      - `bio` (text, professional bio)
      - `location` (text, optional)
      - `website` (text, optional)
      - `linkedin` (text, optional)
      - `github` (text, optional)
      - `email` (text, optional)
      - `skills` (jsonb, array of skill names)
      - `projects` (jsonb, array of project objects)
      - `experience` (jsonb, array of experience objects)
      - `theme` (text, selected theme name)
      - `is_public` (boolean, portfolio visibility)
      - `view_count` (integer, number of views)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `ai_generations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `type` (text, e.g., 'resume', 'bio', 'case_study', 'skills_gap')
      - `input` (text, truncated user input)
      - `output` (jsonb, AI-generated result)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Policies for authenticated users to manage their own data
    - Public read access for published portfolios only
*/

-- Create portfolios table
CREATE TABLE IF NOT EXISTS portfolios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  username text UNIQUE NOT NULL,
  name text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  bio text NOT NULL DEFAULT '',
  location text DEFAULT '',
  website text DEFAULT '',
  linkedin text DEFAULT '',
  github text DEFAULT '',
  email text DEFAULT '',
  skills jsonb DEFAULT '[]'::jsonb,
  projects jsonb DEFAULT '[]'::jsonb,
  experience jsonb DEFAULT '[]'::jsonb,
  theme text DEFAULT 'warm-luxury',
  is_public boolean DEFAULT false,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create ai_generations table
CREATE TABLE IF NOT EXISTS ai_generations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  input text NOT NULL,
  output jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_generations ENABLE ROW LEVEL SECURITY;

-- Portfolios policies
CREATE POLICY "Users can view own portfolio"
  ON portfolios FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Public can view published portfolios"
  ON portfolios FOR SELECT
  TO anon
  USING (is_public = true);

CREATE POLICY "Users can insert own portfolio"
  ON portfolios FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolio"
  ON portfolios FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own portfolio"
  ON portfolios FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- AI generations policies
CREATE POLICY "Users can view own AI generations"
  ON ai_generations FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI generations"
  ON ai_generations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own AI generations"
  ON ai_generations FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create index for faster username lookups
CREATE INDEX IF NOT EXISTS portfolios_username_idx ON portfolios(username);
CREATE INDEX IF NOT EXISTS portfolios_user_id_idx ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS ai_generations_user_id_idx ON ai_generations(user_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_portfolios_updated_at'
  ) THEN
    CREATE TRIGGER update_portfolios_updated_at
      BEFORE UPDATE ON portfolios
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
