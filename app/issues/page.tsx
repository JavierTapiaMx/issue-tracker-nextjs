"use client";

// import { trpc } from "@/trpc/client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const IssuesPage = () => {
  // const { data: issues, isLoading } = trpc.issues.getAll.useQuery();
  // const addIssueMutation = trpc.issues.add.useMutation();

  // const handleAddIssue = async () => {
  //   await addIssueMutation.mutateAsync({
  //     title: "New Issue",
  //     description: "Issue description"
  //   });
  //   // Ideally, you would refresh the issues list here after adding a new issue
  // };

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="text-center">
      <h1 className="mb-4 text-2xl font-bold">Issues</h1>
      <Button>
        <Link href="/issues/new">New Issue</Link>
      </Button>
    </div>
  );
};

export default IssuesPage;
