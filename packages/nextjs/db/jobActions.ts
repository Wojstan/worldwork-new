"use server"

import { employee, job, NewJob } from "~~/db/schema";
import { db } from "~~/db/drizzle";
import { eq } from 'drizzle-orm'


export const addJobOffer = (newJob: NewJob) => {
  return db.insert(job).values(newJob).returning()
}

export const getJobOffers = () => {
  return db.select().from(job).leftJoin(employee, eq(job.employer, employee.wallet))
}
