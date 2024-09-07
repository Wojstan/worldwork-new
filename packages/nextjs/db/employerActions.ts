'use server'

import { eq } from 'drizzle-orm'
import { db } from '~~/db/drizzle'
import { NewEmployer, employer } from '~~/db/schema'

export const addEmployer = async (newEmployer: NewEmployer) => {
  return db.insert(employer).values(newEmployer).returning()
}

export const getEmployer = async (wallet: string) => {
  return db.select().from(employer).where(eq(employer.wallet, wallet))
}
