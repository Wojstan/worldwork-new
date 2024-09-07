'use server'

import { db } from '~~/db/drizzle'
import { employer, NewEmployer } from '~~/db/schema'

export const addEmployer = async (newEmployer: NewEmployer) => {
  return db.insert(employer).values(newEmployer).returning()
}
