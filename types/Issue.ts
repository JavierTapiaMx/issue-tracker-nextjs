import { IssueStatus, IssuePriorities } from "@/db/schema";

export type Issue = {
  id: number;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriorities;
  createdAt: Date;
  updatedAt: Date;
};
