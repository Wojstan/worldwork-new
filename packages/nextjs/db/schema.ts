import { pgTable, text } from 'drizzle-orm/pg-core'
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const employer = pgTable('employer', {
  wallet: text('wallet').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
})

export const employee = pgTable('employee', {
  wallet: text('wallet').primaryKey(),
  name: text('name').notNull(),
})

export const insertEmployerSchema = createInsertSchema(employer)
export const selectEmployerSchema = createSelectSchema(employer)
export type Employer = z.infer<typeof selectEmployerSchema>
export type NewEmployer = z.infer<typeof insertEmployerSchema>

export const insertEmployeeSchema = createInsertSchema(employee)
export const selectEmployeeSchema = createSelectSchema(employee)
export type Employee = z.infer<typeof insertEmployeeSchema>
export type NewEmployee = z.infer<typeof selectEmployeeSchema>
