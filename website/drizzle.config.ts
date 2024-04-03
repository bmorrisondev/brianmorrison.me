import type { Config } from "drizzle-kit";
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env' })

console.log(process.env.DATABASE_URL)

export default {
  schema: "./functions/db/schema.ts",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  verbose: true,
  strict: true,
} satisfies Config;
