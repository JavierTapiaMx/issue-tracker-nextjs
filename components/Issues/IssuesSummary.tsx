import { IssueStatus } from "@/db/schema";
import { Card } from "../ui/card";
import Link from "next/link";

interface Props {
  openIssues: number;
  inProgressIssues: number;
  closedIssues: number;
}

const IssuesSummary = ({
  openIssues,
  inProgressIssues,
  closedIssues
}: Props) => {
  const containers: {
    label: string;
    value: number;
    status: IssueStatus;
  }[] = [
    { label: "Open Issues", value: openIssues, status: IssueStatus.OPEN },
    {
      label: "In Progress Issues",
      value: inProgressIssues,
      status: IssueStatus.IN_PROGRESS
    },
    { label: "Closed Issues", value: closedIssues, status: IssueStatus.CLOSED }
  ];

  return (
    <div className="flex flex-row gap-4">
      {containers.map((container) => (
        <Card
          key={container.label}
          className="flex flex-1 flex-col items-center gap-1"
        >
          <Link
            href={`/issues?status=${container.status}`}
            className="cursor-pointer text-sm font-medium"
          >
            {container.label}
          </Link>
          <span className="text-2xl font-bold">{container.value}</span>
        </Card>
      ))}
    </div>
  );
};

export default IssuesSummary;
