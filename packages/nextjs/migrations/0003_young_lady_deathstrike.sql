ALTER TABLE "job" ALTER COLUMN "employer" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "job" ALTER COLUMN "arrayIndex" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "job" ADD COLUMN "name" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "job" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "job" ADD COLUMN "stablecoinSalary" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "job" ADD COLUMN "tokenSalary" integer DEFAULT 0 NOT NULL;