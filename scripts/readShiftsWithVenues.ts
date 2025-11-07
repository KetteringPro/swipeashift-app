import 'dotenv/config';
import { createClient } from "@/lib/supabase/server";

async function readShiftsWithVenues() {
  console.log("🔍 Fetching open shifts with venue info...");

  const { data, error } = await supabase
    .from("shifts")
    .select(`
      id,
      role,
      date,
      start_time,
      end_time,
      pay_rate,
      description,
      status,
      positions_open,
      experience_level,
      venues (
        id,
        name,
        address,
        pay_range,
        perks
      )
    `)
    .eq("status", "OPEN")
    .order("date", { ascending: true });

  if (error) {
    console.error("❌ Query failed:", error);
    return;
  }

  if (!data || data.length === 0) {
    console.log("⚠️ No open shifts found.");
    return;
  }

  console.log(`✅ Found ${data.length} open shift(s):\n`);
  data.forEach((shift) => {
    const venue = shift.venues?.[0];
    if (!venue) return;
    console.log(
      `🧩 ${venue?.name} — ${shift.role} (${shift.date})
       📍 ${venue?.address}
       💵 ${shift.pay_rate}/hr (${venue?.pay_range})
       🕓 ${shift.start_time} to ${shift.end_time}
       🎯 ${shift.description}
       💡 Perks: ${venue?.perks}
      `
    );
  });
}

readShiftsWithVenues();