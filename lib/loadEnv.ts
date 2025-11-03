import * as dotenv from "dotenv";
import path from "path";

const env = process.env.NEXT_PUBLIC_ENV || "local";

// Force-load .env.staging when running staging
if (env === "staging") {
  const envPath = path.resolve(process.cwd(), ".env.staging");
  dotenv.config({ path: envPath });
  console.log("✅ Loaded .env.staging explicitly from", envPath);
} else {
  const envPath = path.resolve(process.cwd(), ".env.local");
  dotenv.config({ path: envPath });
  console.log("✅ Loaded .env.local explicitly from", envPath);
}