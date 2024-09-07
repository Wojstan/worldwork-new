'use server'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'
import { db } from '~~/db/drizzle'
import { employer } from '~~/db/schema'

export const insertEmployerSchema = createInsertSchema(employer)
export const selectEmployerSchema = createSelectSchema(employer)
export type Employer = z.infer<typeof selectEmployerSchema>
export type NewEmployer = z.infer<typeof insertEmployerSchema>

export const addEmployer = async (newEmployer: NewEmployer) => {
  return db.insert(employer).values(newEmployer).returning()
}
