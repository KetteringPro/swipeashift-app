// scripts/matchShiftsToWorkers.ts
import "dotenv/config";
import { createClient } from "@/lib/supabase/server";

/**
 * ShoreStaff Match Engine (Worker → Shifts)
 * This script runs periodically to match workers to open shifts
 */

async function matchShiftsToWorkers() {
  const supabase = await createClient();
  // Create the Supabase client

  // 1) Load OPEN shifts + venue info
  const { data: shifts, error: shErr } = await supabase
    .from("shifts")
    .select("id, role, date, start_time, end_time, pay_rate, status, venue_id, venues(id,name,address)")
    .eq("status", "OPEN")

  // Continue with the rest of your existing logic...
  // Just replace all instances of 'supabase' with 'supabase'
}

matchShiftsToWorkers();
