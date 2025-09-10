import { trpc } from "@/trpc/server";

const IssuesPage = async () => {
  const issues = await trpc.issues.getAll();

  return (
    <div>
      <h1>Issues</h1>
      <ul>
        {issues.map((issue) => (
          <li key={issue.id}>{issue.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default IssuesPage;
