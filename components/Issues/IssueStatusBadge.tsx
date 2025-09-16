import { IssueStatus } from "@/db/schema";
import { Badge } from "../ui/badge";

const statusMap: Record<IssueStatus, { text: string; style: string }> = {
  open: {
    text: "Open",
    style: "bg-red-100 text-red-800 ring-red-800/10"
  },
  in_progress: {
    text: "In Progress",
    style: "bg-violet-100 text-violet-800 ring-violet-800/10"
  },
  closed: {
    text: "Closed",
    style: "bg-green-100 text-green-800 ring-green-800/10"
  }
};

const IssueStatusBadge = ({ status }: { status: IssueStatus }) => {
  const { text, style } = statusMap[status];

  return <Badge className={style}>{text}</Badge>;
};

export default IssueStatusBadge;
