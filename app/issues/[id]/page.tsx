import { trpc } from "@/trpc/server";
import { Issue } from "@/types/Issue";
import { notFound } from "next/navigation";

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
      <h1 className="mb-4 text-2xl font-bold">{issue.title}</h1>
      <p className="mb-2">Description: {issue.description}</p>
      <p className="mb-2">Status: {issue.status}</p>
      <p className="mb-2">Priority: {issue.priority}</p>
      <p className="text-muted-foreground text-sm">
        Created At: {issue.createdAt.toLocaleDateString()}
      </p>
    </div>
  );
};

export default IssueDetailsPage;
