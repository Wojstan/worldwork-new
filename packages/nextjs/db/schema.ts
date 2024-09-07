import { boolean, integer, pgTable, primaryKey, text } from 'drizzle-orm/pg-core'
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

export const job = pgTable('job', {
  employer: text('employer').notNull(),
  employee: text('worker'),
  arrayIndex: integer('arrayIndex').notNull(),
  name: text('name').notNull().default(''),
  description: text('description').notNull(),
  startDate: text('startDate'),
  endDate: text('endDate'),
  location: text('location'),
  position: text('position'),
  stablecoinSalary: integer('stablecoinSalary').notNull().default(0),
  tokenSalary: integer('tokenSalary').notNull().default(0),
  signed: boolean('signed').default(false),
  referenceDescription: text('referenceDescription'),
}, (table) => ({
  pk: primaryKey({columns: [table.employer, table.arrayIndex]}),
}))

export const insertEmployerSchema = createInsertSchema(employer)
export const selectEmployerSchema = createSelectSchema(employer)
export type Employer = z.infer<typeof selectEmployerSchema>
export type NewEmployer = z.infer<typeof insertEmployerSchema>

export const insertEmployeeSchema = createInsertSchema(employee)
export const selectEmployeeSchema = createSelectSchema(employee)
export type Employee = z.infer<typeof selectEmployeeSchema>
export type NewEmployee = z.infer<typeof insertEmployeeSchema>

export const insertJobSchema = createInsertSchema(job)
export const selectJobSchema = createSelectSchema(job)
export type Job = z.infer<typeof selectJobSchema>
export type NewJob = z.infer<typeof insertJobSchema>
