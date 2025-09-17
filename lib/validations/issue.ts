import { IssuePriorities, IssueStatus } from "@/db/schema";
import { z } from "zod";

// Base schema with common field validations
const baseIssueFields = {
  id: z.number(),
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required").max(5000),
  status: z.enum(IssueStatus),
  priority: z.enum(IssuePriorities),
  assignedToUserId: z
    .string()
    .min(1, "Assigned To User Id is required")
    .max(255)
    .optional()
    .nullable()
};

// Schema for creating new issues (no status required, defaults to OPEN)
export const issueFormSchema = z.object({
  title: baseIssueFields.title,
  description: baseIssueFields.description,
  priority: baseIssueFields.priority
});

// Schema for form usage (handles both create and edit)
export const issueFormFullSchema = z.object({
  id: z.number().optional(),
  title: baseIssueFields.title,
  description: baseIssueFields.description,
  status: baseIssueFields.status.optional(),
  priority: baseIssueFields.priority,
  assignedToUserId: baseIssueFields.assignedToUserId.optional()
});

// Schema for updating existing issues (all fields optional except id)
export const issueUpdateSchema = z.object({
  id: baseIssueFields.id,
  title: baseIssueFields.title.optional(),
  description: baseIssueFields.description.optional(),
  status: baseIssueFields.status.optional(),
  priority: baseIssueFields.priority.optional(),
  assignedToUserId: baseIssueFields.assignedToUserId
});

// Legacy schema for backward compatibility
export const issueSchema = issueFormFullSchema;

export type IssueFormInput = z.infer<typeof issueFormSchema>;
export type IssueUpdateInput = z.infer<typeof issueUpdateSchema>;
export type IssueInput = z.infer<typeof issueSchema>;
