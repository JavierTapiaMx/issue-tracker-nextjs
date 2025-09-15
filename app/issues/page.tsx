import IssuesError from "@/components/Issues/IssuesError";
import IssuesTable from "@/components/Issues/IssuesTable";
import NoIssues from "@/components/Issues/NoIssues";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/server";
import Link from "next/link";
import { FaRegPlusSquare } from "react-icons/fa";
// import delay from "del@/components/Issues/IssuesTable

const IssuesPage = async () => {
  let issues;
  let errorMessage: string | null = null;

  // await delay(2000); // Simulate network delay for demonstration

  try {
    issues = await trpc.issues.getAll();
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
      <div className="mb-6 flex flex-row items-center justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold">Issues</h1>
          <p className="text-muted-foreground">
            Manage and track your project issues
          </p>
        </div>
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
