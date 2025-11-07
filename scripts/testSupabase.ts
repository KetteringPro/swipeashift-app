import 'dotenv/config';
import { supabase } from "../lib/supabaseClient";

async function testConnection() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("users").select("*").limit(1);
  if (error) console.error("❌ Supabase error:", error);
  else console.log("✅ Connection successful. Users:", data);
}

testConnection();