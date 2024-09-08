"use server"

import { employer,employee, job, NewJob } from "~~/db/schema";
import { db } from "~~/db/drizzle";
import { eq, and } from 'drizzle-orm'


export const addJobOffer = (newJob: NewJob) => {
  return db.insert(job).values(newJob).returning()
}

export const getJobOffers = () => {
  return db.select().from(job).leftJoin(employer, eq(job.employer, employer.wallet))
}

export const getJob = (employerAddress: string, index: number) => {
  return db.select().from(job).where(and(eq(job.employer, employerAddress), eq(job.arrayIndex, index))).leftJoin(employer, eq(job.employer, employer.wallet))
}

export const getCompanyOffers = (employer: string) => {
  return db.select().from(job).where(eq(job.employer, employer))
}

export const getEmployeeHistory = (employee: string) => {
  return db.select().from(job).where(eq(job.employee, employee))
}
