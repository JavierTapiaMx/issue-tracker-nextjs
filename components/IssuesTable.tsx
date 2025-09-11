"use client";

import { Issue } from "@/types/Issue";
import IssueStatusBadge from "./IssueStatusBadge";
import IssuePriorityBadge from "./IssuePriorityBadge";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface Props {
  issues: Issue[];
}

const IssuesTable = ({ issues }: Props) => {
  return (
    <div className="w-full space-y-4">
      <div className="bg-card rounded-lg border">
        <div className="bg-background w-full overflow-hidden rounded-md border">
          <div className="overflow-x-auto">
            <Table>
              <TableCaption className="text-muted-foreground mt-8 text-sm">
                Total: {issues.length}{" "}
                {issues.length === 1 ? "issue" : "issues"}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Priority
                  </TableHead>
                  <TableHead className="hidden md:table-cell">
                    Created
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {issues.map((issue) => (
                  <TableRow key={issue.id} className="hover:bg-muted/50">
                    <TableCell className="space-y-2">
                      <div className="font-medium">{issue.title}</div>
                      {/* Mobile-only: Show additional info below title */}
                      <div className="text-muted-foreground block space-y-2 text-sm md:hidden">
                        <div className="flex items-center gap-2">
                          <IssueStatusBadge status={issue.status} />
                          <IssuePriorityBadge priority={issue.priority} />
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {issue.createdAt.toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit"
                          })}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <IssueStatusBadge status={issue.status} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <IssuePriorityBadge priority={issue.priority} />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <span className="text-muted-foreground text-sm">
                        {issue.createdAt.toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit"
                        })}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesTable;
