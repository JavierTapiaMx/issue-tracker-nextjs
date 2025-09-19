import IssuesError from "@/components/Issues/IssuesError";
import IssuesTable from "@/components/Issues/IssuesTable";
import IssueStatusFilter from "@/components/Issues/IssueStatusFilter";
import NoIssues from "@/components/Issues/NoIssues";
import { Button } from "@/components/ui/button";
import { IssueStatus } from "@/db/schema";
import { trpc } from "@/trpc/server";
import Link from "next/link";
import { FaRegPlusSquare } from "react-icons/fa";
// import delay from "del@/components/Issues/IssuesTable

interface Props {
  searchParams: Promise<{
    status?: IssueStatus | "all";
    sortBy?: string;
    order?: "asc" | "desc";
  }>;
}

const IssuesPage = async ({ searchParams }: Props) => {
  let issues;
  let errorMessage: string | null = null;

  // await delay(2000); // Simulate network delay for demonstration

  const resolvedSearchParams = await searchParams;
  let status = resolvedSearchParams?.status;
  let sortBy = resolvedSearchParams?.sortBy;
  let order = resolvedSearchParams?.order;

  if (
    !Object.values(IssueStatus).includes(status as IssueStatus) &&
    status !== "all"
  ) {
    status = "all";
  }

  if (
    sortBy &&
    !["title", "status", "priority", "createdAt"].includes(sortBy)
  ) {
    sortBy = undefined;
  }

  if (order && !["asc", "desc"].includes(order)) {
    order = undefined;
  }

  try {
    issues = await trpc.issues.getIssues({
      status: status as IssueStatus | "all" | undefined,
      sortBy: sortBy as
        | "title"
        | "status"
        | "priority"
        | "createdAt"
        | undefined,
      order: order as "asc" | "desc" | undefined
    });
  } catch (error) {
    console.error("Error fetching issues:", error);

    // Extract meaningful error message from tRPC error
    if (error && typeof error === "object" && "message" in error) {
      errorMessage = error.message as string;
    } else {
      errorMessage = "An unexpected error occurred while loading issues";
    }
  }

  // Render error state
  if (errorMessage) {
    return <IssuesError errorMessage={errorMessage} />;
  }

  // Render success state
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-foreground text-3xl font-bold">Issues</h1>
      <p className="text-muted-foreground mb-4">
        Manage and track your project issues
      </p>
      <div className="mb-6 flex flex-row items-center justify-between">
        <IssueStatusFilter status={status} />
        <Button>
          <FaRegPlusSquare className="h-4 w-4" />
          <Link href="/issues/new" className="flex items-center gap-2">
            New Issue
          </Link>
        </Button>
      </div>

      {issues && issues.length === 0 ? (
        <NoIssues />
      ) : issues ? (
        <IssuesTable issues={issues} />
      ) : null}
    </div>
  );
};

export default IssuesPage;
