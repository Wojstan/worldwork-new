import { neon } from '@neondatabase/serverless'
import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/neon-http'

config({ path: '.env.local' }) // or .env.local

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL env not provided')
}

const sql = neon(process.env.DATABASE_URL)

export const db = drizzle(sql)
