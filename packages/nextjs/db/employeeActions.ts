'use server'

import { eq } from 'drizzle-orm'
import { db } from '~~/db/drizzle'
import { NewEmployee, employee } from '~~/db/schema'

export const addEmployee = (newEmployee: NewEmployee) => {
  return db.insert(employee).values(newEmployee).returning()
}

export const getEmployee = async (employeeAddress: string) =>
  db.select().from(employee).where(eq(employee.wallet, employeeAddress))
