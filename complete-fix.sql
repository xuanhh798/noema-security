-- Complete fix for waitlist table with proper RLS policies
-- Run this entire script in your Supabase SQL Editor

-- Step 1: Drop existing table and policies (if any)
DROP TABLE IF EXISTS waitlist CASCADE;

-- Step 2: Create the waitlist table
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  company_size TEXT NOT NULL,
  challenge TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(email)
);

-- Step 3: Enable RLS
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Step 4: Create a policy that allows ALL operations for anonymous users
-- This is the simplest approach for a public waitlist form
CREATE POLICY "Enable all access for anonymous users" ON waitlist
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Alternative: If you want more granular control, use these instead:
-- CREATE POLICY "Enable insert for anonymous" ON waitlist
--   FOR INSERT
--   WITH CHECK (auth.role() = 'anon' OR auth.role() = 'authenticated');
-- 
-- CREATE POLICY "Enable select for all" ON waitlist
--   FOR SELECT
--   USING (true);

-- Step 5: Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON waitlist(created_at DESC);

-- Step 6: Test by inserting a sample record
-- INSERT INTO waitlist (email, company, company_size, challenge)
-- VALUES ('test@example.com', 'Test Company', '1-50', 'Testing the form');

-- Step 7: Verify the policies are created
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check 
FROM pg_policies 
WHERE tablename = 'waitlist';
