"use server"

import { job, NewJob } from "~~/db/schema";
import { db } from "~~/db/drizzle";

export const addJobOffer = (newJob: NewJob) => {
  return db.insert(job).values(newJob).returning()
}

export const getJobOffers = () => {
  return db.select().from(job)
}
