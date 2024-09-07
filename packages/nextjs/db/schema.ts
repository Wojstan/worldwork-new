import { pgTable, text } from 'drizzle-orm/pg-core'

export const employer = pgTable('employer', {
  wallet: text('wallet').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
})
