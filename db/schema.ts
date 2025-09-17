import {
  datetime,
  mysqlEnum,
  mysqlTable,
  serial,
  text,
  varchar
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export enum IssueStatus {
  OPEN = "open",
  IN_PROGRESS = "in_progress",
  CLOSED = "closed"
}

export enum IssuePriorities {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
}

export const issuesTable = mysqlTable("issues", {
  id: serial().primaryKey(),
  title: varchar({ length: 255 }).notNull(),
  description: text().notNull(),
  status: mysqlEnum(IssueStatus).notNull().default(IssueStatus.OPEN),
  priority: mysqlEnum(IssuePriorities).notNull().default(IssuePriorities.LOW),
  createdAt: datetime({ mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: datetime({ mode: "date" })
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdate(() => new Date()),
  assignedToUserId: varchar({ length: 255 })
});
