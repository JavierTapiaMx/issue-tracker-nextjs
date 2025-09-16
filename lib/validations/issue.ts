import { IssuePriorities, IssueStatus } from "@/db/schema";
import { z } from "zod";

export const issueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
  status: z.enum(IssueStatus),
  priority: z.enum(IssuePriorities)
});

export type IssueInput = z.infer<typeof issueSchema>;
