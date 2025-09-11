"use client";

// import { trpc } from "@/trpc/client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

const IssuesPage = () => {
  // const { data: issues, isLoading } = trpc.issues.getAll.useQuery();

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
