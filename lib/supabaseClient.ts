import * as dotenv from "dotenv";
import path from "path";

// ✅ Force-load staging first
dotenv.config({ path: path.resolve(process.cwd(), ".env.staging") });
console.log("✅ Forcing .env.staging load manually");

// Now confirm the active env and Supabase URL
console.log("🚀 Active ENV:", process.env.NEXT_PUBLIC_ENV);
console.log("🔗 Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);