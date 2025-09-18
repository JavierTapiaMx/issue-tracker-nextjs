"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Issue } from "@/types/Issue";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import IssuePriorityBadge from "./IssuePriorityBadge";
import IssueStatusBadge from "./IssueStatusBadge";

interface Props {
  issues: Issue[];
}

const IssuesTable = ({ issues }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get current sorting state from URL parameters
  const currentSortBy = searchParams.get("sortBy") as keyof Issue | null;
  const currentOrder = searchParams.get("order") as "asc" | "desc" | null;

  const getSortIcon = (column: keyof Issue) => {
    if (currentSortBy === column) {
      if (currentOrder === "asc") {
        return <ChevronUp className="ml-1 h-4 w-4" />;
      } else {
        return <ChevronDown className="ml-1 h-4 w-4" />;
      }
    }
    return <ArrowUpDown className="ml-1 h-4 w-4" />;
  };

  const handleSorting = (column: keyof Issue) => {
    const params = new URLSearchParams();

    const currentStatus = searchParams.get("status");
    const currentSortByParam = searchParams.get("sortBy");
    const currentOrderParam = searchParams.get("order");

    if (currentStatus) {
      params.set("status", currentStatus);
    }

    params.set("sortBy", column);

    if (currentSortByParam === column) {
      params.set("order", currentOrderParam === "asc" ? "desc" : "asc");
    } else {
      params.set("order", "asc");
    }

    router.push(`/issues?${params.toString()}`);
  };

  const columns: { title: string; value: keyof Issue; className?: string }[] = [
    { title: "Issue", value: "title" },
    { title: "Status", value: "status", className: "hidden md:table-cell" },
    { title: "Priority", value: "priority", className: "hidden md:table-cell" },
    { title: "Created", value: "createdAt", className: "hidden md:table-cell" }
  ];

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
                  {columns.map((column) => (
                    <TableHead key={column.value} className={column.className}>
                      <Button
                        variant={
                          currentSortBy === column.value ? "secondary" : "ghost"
                        }
                        onClick={() => handleSorting(column.value)}
                      >
                        {column.title}
                        {getSortIcon(column.value)}
                      </Button>
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {issues.map((issue) => (
                  <TableRow key={issue.id} className="hover:bg-muted/50">
                    <TableCell className="space-y-2">
                      <div className="font-medium">
                        <Link
                          href={`/issues/${issue.id}`}
                          className="hover:text-primary hover:underline"
                        >
                          {issue.title}
                        </Link>
                      </div>
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
