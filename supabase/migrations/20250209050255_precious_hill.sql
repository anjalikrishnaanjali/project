/*
  # Initial Schema Setup for Lost Pets Social Platform

  1. New Tables
    - `profiles`
      - User profile information
      - Stores points, name, and avatar
    - `posts`
      - Lost pet posts with photos and details
    - `comments`
      - Comments on posts
    - `found_reports`
      - Reports of pets being found by their owners

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  username text UNIQUE NOT NULL,
  full_name text,
  avatar_url text,
  points integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  pet_name text,
  breed text,
  location text NOT NULL,
  description text,
  image_url text NOT NULL,
  status text DEFAULT 'lost' CHECK (status IN ('lost', 'found')),
  created_at timestamptz DEFAULT now()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create found reports table
CREATE TABLE IF NOT EXISTS found_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  finder_id uuid REFERENCES profiles(id) NOT NULL,
  owner_id uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE found_reports ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policies for posts
CREATE POLICY "Posts are viewable by everyone"
  ON posts FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  USING (auth.uid() = user_id);

-- Policies for comments
CREATE POLICY "Comments are viewable by everyone"
  ON comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments"
  ON comments FOR UPDATE
  USING (auth.uid() = user_id);

-- Policies for found reports
CREATE POLICY "Found reports are viewable by everyone"
  ON found_reports FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create found reports"
  ON found_reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = finder_id);

-- Function to update points when a pet is found
CREATE OR REPLACE FUNCTION update_finder_points()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE profiles
  SET points = points + 10
  WHERE id = NEW.finder_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update points
CREATE TRIGGER on_pet_found
  AFTER INSERT ON found_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_finder_points();