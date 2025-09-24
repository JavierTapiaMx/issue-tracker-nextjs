import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { trpc } from "@/trpc/server";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import IssueStatusBadge from "./IssueStatusBadge";

const LatestIssues = async () => {
  let issues;

  try {
    issues = await trpc.issues.getLatest();
  } catch (error) {
    console.error("Error fetching latest issues:", error);
    return <div className="text-red-500">Failed to load latest issues.</div>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Latest Issues</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>
                  <div className="flex flex-col gap-2">
                    <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                    <IssueStatusBadge status={issue.status} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LatestIssues;
