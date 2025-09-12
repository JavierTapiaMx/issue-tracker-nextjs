import { z } from "zod";
import { IssueStatus, IssuePriorities } from "@/db/schema";

export const getIssueSchema = z.object({
  id: z.number()
});

export type GetIssueInput = z.infer<typeof getIssueSchema>;

export const addIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  priority: z.enum(IssuePriorities)
});

export type AddIssueInput = z.infer<typeof addIssueSchema>;

export const updateIssueSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  status: z.enum(IssueStatus),
  priority: z.enum(IssuePriorities)
});

export type UpdateIssueInput = z.infer<typeof updateIssueSchema>;

export const deleteIssueSchema = z.object({
  id: z.number()
});

export type DeleteIssueInput = z.infer<typeof deleteIssueSchema>;
