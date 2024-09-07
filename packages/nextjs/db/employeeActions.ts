"use server"

import { employee, NewEmployee } from "~~/db/schema";
import { db } from "~~/db/drizzle";

export const addEmployee = (newEmployee: NewEmployee) => {
  return db.insert(employee).values(newEmployee).returning()
}
