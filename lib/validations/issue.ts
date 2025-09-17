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

export const addIssueSchema = z.object({
  title: baseIssueFields.title,
  description: baseIssueFields.description,
  priority: baseIssueFields.priority
});

export const updateIssueSchema = z.object({
  id: baseIssueFields.id,
  title: baseIssueFields.title.optional(),
  description: baseIssueFields.description.optional(),
  status: baseIssueFields.status.optional(),
  priority: baseIssueFields.priority.optional(),
  assignedToUserId: baseIssueFields.assignedToUserId
});

export const issueFormSchema = z.object({
  id: z.number().optional(),
  title: baseIssueFields.title,
  description: baseIssueFields.description,
  status: baseIssueFields.status.optional(),
  priority: baseIssueFields.priority,
  assignedToUserId: baseIssueFields.assignedToUserId.optional()
});

export type AddIssueInput = z.infer<typeof addIssueSchema>;
export type UpdateIssueInput = z.infer<typeof updateIssueSchema>;
export type IssueFormInput = z.infer<typeof issueFormSchema>;
