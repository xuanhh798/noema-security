# Supabase Setup Instructions

## Prerequisites

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project

## Step 1: Create the Database Table

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Run the SQL script from `supabase-setup.sql` file

Or copy and paste this:

```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  company_size TEXT NOT NULL,
  challenge TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  UNIQUE(email)
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts" ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow service role to read" ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);
```

## Step 2: Get Your API Keys

1. Go to Project Settings > API
2. Copy your `Project URL` and `anon public` key

## Step 3: Configure Environment Variables

1. Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

2. Replace the values with your actual Supabase credentials

## Step 4: Restart Your Development Server

```bash
npm run dev
```

## Testing

1. Fill out the "Get Early Access" form on your landing page
2. Check your Supabase database to see if the entry was added
3. Go to Table Editor > waitlist to view submissions

## Viewing Submissions

You can view all waitlist submissions in Supabase:

1. Go to Table Editor
2. Select the `waitlist` table
3. View all submissions with timestamps

## Optional: Email Notifications

To get notified when someone signs up, you can:

1. Set up Supabase Database Webhooks
2. Use Supabase Edge Functions
3. Integrate with services like Zapier or Make (formerly Integromat)
