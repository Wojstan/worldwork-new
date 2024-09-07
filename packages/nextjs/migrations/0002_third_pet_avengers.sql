CREATE TABLE IF NOT EXISTS "job" (
	"employer" text,
	"arrayIndex" integer,
	"description" text NOT NULL,
	"startDate" text,
	"endDate" text,
	CONSTRAINT "job_employer_arrayIndex_pk" PRIMARY KEY("employer","arrayIndex")
);
