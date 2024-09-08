'use server'

import { and, eq, isNull, sql } from 'drizzle-orm'
import { db } from '~~/db/drizzle'
import { NewJob, employer, job } from '~~/db/schema'

export const addJobOffer = (newJob: NewJob) => {
  return db.insert(job).values(newJob).returning()
}

export const getJobOffers = () => {
  return db.select().from(job).leftJoin(employer, eq(job.employer, employer.wallet)).where(isNull(job.employee))
}

export const getJob = (employerAddress: string, index: number) => {
  return db
    .select()
    .from(job)
    .where(and(eq(job.employer, employerAddress), eq(job.arrayIndex, index)))
    .leftJoin(employer, eq(job.employer, employer.wallet))
}

export const getCompanyOffers = (employer: string) => {
  return db
    .select()
    .from(job)
    .where(and(eq(job.employer, employer), isNull(job.employee)))
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

export const getJobByEmployerAndEmployee = async (employerAddress: string, employeeAddress: string) => {
  return db
    .select()
    .from(job)
    .where(and(eq(job.employer, employerAddress), eq(job.employee, employeeAddress)))
}

export const makeJobPayment = async (employer: string, index: number) => {
  await db
    .update(job)
    .set({
      paid: true
    })
    .where(and(eq(job.employer, employer), eq(job.arrayIndex, index)))
}
