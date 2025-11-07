import 'dotenv/config';
import { createClient } from "@/lib/supabase/server";

async function testConnection() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("users").select("*").limit(1);
  if (error) console.error("❌ Supabase error:", error);
  else console.log("✅ Connection successful. Users:", data);
}

testConnection();