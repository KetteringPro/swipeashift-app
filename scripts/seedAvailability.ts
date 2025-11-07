import 'dotenv/config';
import { createClient } from "@/lib/supabase/server";

async function seedAvailability() {
  console.log("🌅 Seeding worker availability...");

  const workers = [
    { email: "christy.worker@shorestaff.app", schedule: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], start: "15:00:00", end: "23:00:00" } },
    { email: "maya.mixwell@shorestaff.app", schedule: { days: ["Thursday", "Friday", "Saturday", "Sunday"], start: "16:00:00", end: "02:00:00" } },
    { email: "leo.linecook@shorestaff.app", schedule: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], start: "08:00:00", end: "16:00:00" } },
    { email: "ava.hostson@shorestaff.app", schedule: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], start: "10:00:00", end: "18:00:00" } },
    { email: "nick.nightowl@shorestaff.app", schedule: { days: ["Friday", "Saturday", "Sunday"], start: "18:00:00", end: "03:00:00" } },
  ];

  for (const worker of workers) {
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, email")
      .eq("email", worker.email)
      .single();

    if (userError || !user) {
      console.error(`❌ Could not find user for ${worker.email}`);
      continue;
    }

    console.log(`👤 Found worker: ${worker.email}`);

    const availabilityRecords = worker.schedule.days.map((day) => ({
      user_id: user.id,
      day_of_week: day,
      start_time: worker.schedule.start,
      end_time: worker.schedule.end,
    }));

    const { error: insertError } = await supabase
      .from("availability")
      .insert(availabilityRecords);

    if (insertError) {
      console.error(`❌ Failed to insert availability for ${worker.email}:`, insertError);
    } else {
      console.log(`✅ Inserted ${availabilityRecords.length} availability records for ${worker.email}`);
    }
  }

  console.log("🌅 Availability seeding complete!");
}

seedAvailability();