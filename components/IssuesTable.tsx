"use client";

import { Issue } from "@/types/Issue";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

// Component to render the title cell with mobile responsiveness
const TitleCell = ({ issue }: { issue: Issue }) => {
  return (
    <div className="space-y-1">
      <div className="font-medium">{issue.title}</div>
      {/* Mobile-only: Show additional info below title */}
      <div className="text-muted-foreground block space-y-1 text-sm md:hidden">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
            {issue.status.replace("_", " ").toUpperCase()}
          </span>
          <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
            {issue.priority.toUpperCase()}
          </span>
        </div>
        <div className="text-muted-foreground text-xs">
          {issue.createdAt.toLocaleDateString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          })}
        </div>
      </div>
    </div>
  );
};

// Component to render status badge
const StatusCell = ({ status }: { status: string }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
};

// Component to render priority badge
const PriorityCell = ({ priority }: { priority: string }) => {
  return (
    <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
      {priority.toUpperCase()}
    </span>
  );
};

// Component to render created date
const CreatedCell = ({ date }: { date: Date }) => {
  return (
    <span className="text-muted-foreground text-sm">
      {date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      })}
    </span>
  );
};

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
                {issues.length > 0 ? (
                  issues.map((issue) => (
                    <TableRow key={issue.id} className="hover:bg-muted/50">
                      <TableCell>
                        <TitleCell issue={issue} />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <StatusCell status={issue.status} />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <PriorityCell priority={issue.priority} />
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <CreatedCell date={issue.createdAt} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesTable;
