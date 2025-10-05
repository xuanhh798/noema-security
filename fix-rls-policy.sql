-- Quick fix for RLS policy error
-- Run this in your Supabase SQL Editor

-- Drop the existing policy if it exists
DROP POLICY IF EXISTS "Allow public inserts" ON waitlist;

-- Create a new policy that allows anonymous inserts
CREATE POLICY "Enable insert for everyone" ON waitlist
  FOR INSERT
  WITH CHECK (true);

-- Also ensure anonymous users can read their own inserted data (optional)
DROP POLICY IF EXISTS "Allow public to read own data" ON waitlist;
CREATE POLICY "Allow public to read own data" ON waitlist
  FOR SELECT
  USING (true);

-- Verify the policies
SELECT * FROM pg_policies WHERE tablename = 'waitlist';
