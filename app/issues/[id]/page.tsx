import { trpc } from "@/trpc/server";
import { Issue } from "@/types/Issue";
import { notFound } from "next/navigation";

import IssuePriorityBadge from "@/components/IssuePriorityBadge";
import IssueStatusBadge from "@/components/IssueStatusBadge";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface Props {
  params: { id: string };
}

const IssueDetailsPage = async ({ params }: Props) => {
  let issue: Issue | null = null;
  let errorMessage: string | null = null;

  try {
    issue = await trpc.issues.getById({ id: parseInt(params.id, 10) });
  } catch (error) {
    console.error("Error fetching issues:", error);

    // Extract meaningful error message from tRPC error
    if (error && typeof error === "object" && "message" in error) {
      errorMessage = error.message as string;
    } else {
      errorMessage = "An unexpected error occurred while loading issues";
    }
  }

  if (!issue || errorMessage) {
    notFound();
  }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">{issue.title}</h1>
      <div className="mb-4 flex flex-row items-center gap-4">
        <IssueStatusBadge status={issue.status} />
        <IssuePriorityBadge priority={issue.priority} />
        <p className="text-muted-foreground text-sm">
          {issue.createdAt.toLocaleDateString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          })}
        </p>
      </div>
      <Card>
        <CardContent>
          <CardTitle className="mb-4">Description</CardTitle>
          <CardDescription>{issue.description}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssueDetailsPage;
