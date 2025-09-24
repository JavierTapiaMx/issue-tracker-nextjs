import { type InferSelectModel, type InferInsertModel } from "drizzle-orm";
import { issuesTable } from "@/db/schema";

// Generate types directly from schema for better type safety
export type Issue = InferSelectModel<typeof issuesTable>;
export type NewIssue = InferInsertModel<typeof issuesTable>;

// For forms/API inputs (without auto-generated fields like id, createdAt, updatedAt)
export type IssueFormInput = Omit<NewIssue, "id" | "createdAt" | "updatedAt">;
