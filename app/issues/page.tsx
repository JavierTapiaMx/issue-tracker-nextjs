"use client";

import { trpc } from "@/trpc/client";
import { Button } from "@/components/ui/button";

const IssuesPage = () => {
  const { data: issues } = trpc.issues.getAll.useQuery();
  const addIssueMutation = trpc.issues.add.useMutation();

  const handleAddIssue = async () => {
    await addIssueMutation.mutateAsync({
      title: "New Issue",
      description: "Issue description"
    });
    // Ideally, you would refresh the issues list here after adding a new issue
  };

  return (
    <div>
      <h1>Issues</h1>
      <ul>
        {issues?.map((issue) => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ul>
      <Button onClick={handleAddIssue}>Add Issue</Button>
    </div>
  );
};

export default IssuesPage;
