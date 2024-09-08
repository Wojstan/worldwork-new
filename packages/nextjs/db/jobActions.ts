'use server'

import { and, eq, sql } from 'drizzle-orm'
import { db } from '~~/db/drizzle'
import { NewJob, employee, job } from '~~/db/schema'

export const addJobOffer = (newJob: NewJob) => {
  return db.insert(job).values(newJob).returning()
}

export const getJobOffers = () => {
  return db.select().from(job).leftJoin(employee, eq(job.employer, employee.wallet))
}

export const getJob = (employer: string, index: number) => {
  return db
    .select()
    .from(job)
    .where(and(eq(job.employer, employer), eq(job.arrayIndex, index)))
    .leftJoin(employee, eq(job.employer, employee.wallet))
}

export const getCompanyOffers = (employer: string) => {
  return db.select().from(job).where(eq(job.employer, employer))
}

export const getEmployeeHistory = (employee: string) => {
  return db.select().from(job).where(eq(job.employee, employee))
}

export const acceptEmployeeForJob = async (employeeAddress: string, employer: string, index: number) => {
  await db
    .update(job)
    .set({
      employee: employeeAddress,
      startDate: sql`now()`,
      signed: true,
    })
    .where(and(eq(job.employer, employer), eq(job.arrayIndex, index)))
}
