import IssuePriorityBadge from "@/components/Issues/IssuePriorityBadge";
import IssueStatusBadge from "@/components/Issues/IssueStatusBadge";
import ReactMarkdown from "react-markdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle
} from "@/components/ui/card";
import { Issue } from "@/types/Issue";

interface Props {
  issue: Issue;
}

const IssueDetails = ({ issue }: Props) => {
  return (
    <>
      <h1 className="text-foreground text-3xl font-bold">{issue.title}</h1>
      <div className="mb-4 flex flex-row items-center gap-4">
        <IssueStatusBadge status={issue.status} />
        <IssuePriorityBadge priority={issue.priority} />
        <p className="text-muted-foreground text-sm">
          Created{": "}
          {issue.createdAt.toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric"
          })}
        </p>
      </div>
      <Card>
        <CardContent className="pt-4">
          <CardTitle className="text-muted mb-4 text-sm">Description</CardTitle>
          <CardDescription className="prose max-w-none">
            <ReactMarkdown>{issue.description}</ReactMarkdown>
          </CardDescription>
        </CardContent>
      </Card>
    </>
  );
};

export default IssueDetails;
