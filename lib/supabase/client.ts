'use client'

import { createBrowserClient } from '@supabase/ssr'

// Singleton pattern - create once, reuse everywhere
let browserClient: ReturnType<typeof createBrowserClient> | null = null

export function createClient() {
  if (browserClient) return browserClient

  browserClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  return browserClient
}

// Default export for convenience (import { supabase })
export const supabase = createClient()
