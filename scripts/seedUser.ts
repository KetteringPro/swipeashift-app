import 'dotenv/config';
import { createClient } from "@/lib/supabase/server";

async function seedUser() {
  const supabase = await createClient();
  console.log("🌱 Seeding test user...");

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        email: "testuser@shorestaff.app",
        phone: "555-000-1234",
        role: "WORKER",
        verified: true,
      },
    ])
    .select();

  if (error) console.error("❌ Insert failed:", error);
  else console.log("✅ Test user created:", data);
}

seedUser();