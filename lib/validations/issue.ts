import { IssuePriorities, IssueStatus } from "@/db/schema";
import { z } from "zod";

// Schema for creating new issues (no status required, defaults to OPEN)
export const issueFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  priority: z.nativeEnum(IssuePriorities)
});

// Schema for updating existing issues (includes status)
export const issueUpdateSchema = issueFormSchema.extend({
  status: z.nativeEnum(IssueStatus)
});

// Legacy schema for backward compatibility
export const issueSchema = issueUpdateSchema;

export type IssueFormInput = z.infer<typeof issueFormSchema>;
export type IssueUpdateInput = z.infer<typeof issueUpdateSchema>;
export type IssueInput = z.infer<typeof issueSchema>;
