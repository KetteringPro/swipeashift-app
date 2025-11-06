import { createClient } from '@supabase/supabase-js'

// Server-side client with service role (bypasses RLS)
// Use ONLY for admin operations, cron jobs, or trusted server code
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

// Convenience export
export const supabaseServer = createServerClient()