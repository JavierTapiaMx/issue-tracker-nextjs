import { trpc } from "@/trpc/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus, RefreshCw } from "lucide-react";
import IssuesTable from "@/components/IssuesTable";
// import delay from "delay";

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
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-foreground text-3xl font-bold">Issues</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your project issues
            </p>
          </div>
          <Button asChild>
            <Link href="/issues/new" className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Issue
            </Link>
          </Button>
        </div>

        <div className="border-destructive/20 rounded-lg border-2 border-dashed py-12 text-center">
          <div className="mx-auto max-w-md">
            <h3 className="text-destructive mb-2 text-lg font-semibold">
              Unable to load issues
            </h3>
            <p className="text-muted-foreground mb-4">{errorMessage}</p>
            <div className="flex justify-center gap-2">
              <Button asChild variant="outline">
                <Link href="/issues" className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Link>
              </Button>
              <Button asChild>
                <Link href="/issues/new">Create Issue Anyway</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Render success state
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold">Issues</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your project issues
          </p>
        </div>
        <Button asChild>
          <Link href="/issues/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Issue
          </Link>
        </Button>
      </div>

      {issues && issues.length === 0 ? (
        <div className="border-border rounded-lg border-2 border-dashed py-12 text-center">
          <div className="mx-auto max-w-md">
            <h3 className="text-foreground mb-2 text-lg font-semibold">
              No issues yet
            </h3>
            <p className="text-muted-foreground mb-4">
              Get started by creating your first issue to track bugs, features,
              or tasks.
            </p>
            <Button asChild>
              <Link href="/issues/new" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create your first issue
              </Link>
            </Button>
          </div>
        </div>
      ) : issues ? (
        <IssuesTable issues={issues} />
      ) : null}
    </div>
  );
};

export default IssuesPage;
