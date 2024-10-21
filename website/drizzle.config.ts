import type { Config } from "drizzle-kit";
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

console.log(process.env.DATABASE_URL)

export default {
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: false,
} satisfies Config;
