"use client";

import IssueFormSkeleton from "@/components/Issues/IssueFormSkeleton";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";

const IssueForm = dynamic(() => import("@/components/Issues/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />
});

interface Props {
  params: Promise<{ id: string }>;
}

const EditIssuePage = ({ params }: Props) => {
  const [issueId, setIssueId] = useState<number | null>(null);
  const [isParamsLoaded, setIsParamsLoaded] = useState(false);

  useEffect(() => {
    const loadParams = async () => {
      try {
        const { id } = await params;
        const parsedId = parseInt(id, 10);

        if (isNaN(parsedId) || parsedId <= 0) {
          notFound();
        }

        setIssueId(parsedId);
      } catch (error) {
        console.error("Error loading params:", error);
        notFound();
      } finally {
        setIsParamsLoaded(true);
      }
    };

    loadParams();
  }, [params]);

  // IMPORTANT: Call tRPC query hook directly, but with conditional enabled
  // This ensures the hook is always called in the same order
  const issueQuery = trpc.issues.getById.useQuery(
    { id: issueId || 0 }, // Use fallback ID
    {
      enabled: issueId !== null && isParamsLoaded, // Only enable when we have a valid ID
      retry: false, // Don't retry on the fallback ID
      refetchOnMount: "always", // Always refetch when component mounts (more aggressive)
      refetchOnWindowFocus: true, // Refetch when window gains focus
      refetchOnReconnect: true, // Refetch when reconnecting
      staleTime: 0, // Consider data immediately stale
      gcTime: 0 // Don't keep in cache - always fetch fresh (newer React Query)
    }
  );

  // Early return AFTER hook calls
  if (!isParamsLoaded || issueId === null) {
    return <IssueFormSkeleton />;
  }

  // Handle loading state from the query
  if (issueQuery?.isLoading) {
    return <IssueFormSkeleton />;
  }

  // Handle error state from the query
  if (issueQuery?.error) {
    const errorMessage =
      issueQuery.error.message ||
      "An unexpected error occurred while loading the issue";

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex flex-row items-center justify-between">
          <div>
            <h1 className="text-foreground text-3xl font-bold">
              Issue Details
            </h1>
            <p className="text-muted-foreground">
              View and manage issue information
            </p>
          </div>
          <Button variant="outline">
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
              <Button variant="outline">
                <RefreshCw className="h-4 w-4" />
                <Link
                  href={`/issues/${issueId}`}
                  className="flex items-center gap-2"
                >
                  Try Again
                </Link>
              </Button>
              <Button>
                <Link href="/issues">Back to Issues</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get the actual issue data from the query
  const issue = issueQuery?.data;

  // Handle case where issue is not found (after successful API call)
  if (!issue) {
    notFound();
  }

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
