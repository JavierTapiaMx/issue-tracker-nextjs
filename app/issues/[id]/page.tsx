import DeleteIssueButton from "@/components/Issues/DeleteIssueButton";
import EditIssueButton from "@/components/Issues/EditIssueButton";
import IssueDetails from "@/components/Issues/IssueDetails";
import IssueDetailsError from "@/components/Issues/IssueDetailsError";
import { Button } from "@/components/ui/button";
import AssigneeSelect from "@/components/Users/AssigneeSelect";
import { trpc } from "@/trpc/server";
import { Issue } from "@/types/Issue";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";
// import delay from "delay";

interface Props {
  params: Promise<{ id: string }>;
}

const IssueDetailsPage = async ({ params }: Props) => {
  const { isAuthenticated } = await auth();

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
    return <IssueDetailsError issueId={issueId} errorMessage={errorMessage} />;
  }

  // Handle case where issue is not found (after successful API call)
  if (!issue) {
    notFound();
  }

  // Render success state
  return (
    <div className="container mx-auto grid gap-4 px-4 py-8 lg:grid-cols-5">
      <div className="mb-6 flex flex-col gap-2 lg:col-span-4">
        <IssueDetails issue={issue} />
      </div>

      <div className="flex flex-row gap-4 lg:flex-col">
        {isAuthenticated && (
          <>
            <AssigneeSelect
              issueId={issue.id}
              assignedToUserId={issue.assignedToUserId}
            />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </>
        )}
        <Button variant="outline">
          <Link href="/issues">Back to Issues</Link>
        </Button>
      </div>
    </div>
  );
};

export default IssueDetailsPage;

export const generateMetadata = async ({ params }: Props) => {
  let issue: Issue | null = null;

  const { id } = await params;
  const issueId = parseInt(id, 10);

  if (isNaN(issueId) || issueId <= 0) {
    return {
      title: "Issue Tracker",
      description: "Issue details page."
    };
  }

  try {
    issue = await trpc.issues.getById({ id: issueId });
  } catch (error) {
    console.error("Error fetching issue for metadata:", error);

    return {
      title: "Issue Tracker",
      description: "Issue details page."
    };
  }

  if (!issue) {
    return {
      title: "Issue Tracker",
      description: "Issue details page."
    };
  }

  return {
    title: issue.title,
    description: `Details and information about issue id: ${issue.id}`
  };
};
