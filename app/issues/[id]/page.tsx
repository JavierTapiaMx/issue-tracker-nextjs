import { trpc } from "@/trpc/server";
import { Issue } from "@/types/Issue";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

import IssuePriorityBadge from "@/components/IssuePriorityBadge";
import IssueStatusBadge from "@/components/IssueStatusBadge";

import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from "@/components/ui/card";
// import delay from "delay";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailsPage = async ({ params }: Props) => {
  let issue: Issue | null = null;
  let errorMessage: string | null = null;

  const { id } = await params;
  const issueId = parseInt(id, 10);

  // await delay(2000); // Simulate network delay for demonstration

  if (isNaN(issueId) || issueId <= 0) {
    notFound();
  }

  try {
    issue = await trpc.issues.getById({ id: issueId });
  } catch (error) {
    console.error("Error fetching issue:", error);

    // Extract meaningful error message from tRPC error
    if (error && typeof error === "object" && "message" in error) {
      errorMessage = error.message as string;
    } else {
      errorMessage = "An unexpected error occurred while loading the issue";
    }
  }

  // Render error state
  if (errorMessage) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-foreground text-3xl font-bold">
              Issue Details
            </h1>
            <p className="text-muted-foreground">
              View and manage issue information
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/issues">Back to Issues</Link>
          </Button>
        </div>

        <div className="border-destructive/20 rounded-lg border-2 border-dashed py-12 text-center">
          <div className="mx-auto max-w-md">
            <h3 className="text-destructive mb-2 text-lg font-semibold">
              Unable to load issue
            </h3>
            <p className="text-muted-foreground mb-4">{errorMessage}</p>
            <div className="flex justify-center gap-2">
              <Button asChild variant="outline">
                <Link
                  href={`/issues/${id}`}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try Again
                </Link>
              </Button>
              <Button asChild>
                <Link href="/issues">Back to Issues</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle case where issue is not found (after successful API call)
  if (!issue) {
    notFound();
  }

  // Render success state
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-row items-center justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold">{issue.title}</h1>
          <div className="mt-2 flex flex-row items-center gap-4">
            <IssueStatusBadge status={issue.status} />
            <IssuePriorityBadge priority={issue.priority} />
            <p className="text-muted-foreground text-sm">
              Created{": "}
              {issue.createdAt.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </p>
          </div>
        </div>
        <Button asChild variant="outline">
          <Link href="/issues">Back to Issues</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="pt-4">
          <CardTitle className="text-muted-foreground mb-4 text-sm">
            Description
          </CardTitle>
          <CardDescription className="prose max-w-none">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
