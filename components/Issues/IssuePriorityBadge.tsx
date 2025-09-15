import { IssuePriorities } from "@/db/schema";
import { Badge } from "../ui/badge";

const priorityMap: Record<IssuePriorities, { text: string; style: string }> = {
  low: {
    text: "Low",
    style: "bg-gray-100 text-gray-800"
  },
  medium: {
    text: "Medium",
    style: "bg-yellow-100 text-yellow-800"
  },
  high: {
    text: "High",
    style: "bg-red-100 text-red-800"
  }
};

const IssuePriorityBadge = ({ priority }: { priority: IssuePriorities }) => {
  const { text, style } = priorityMap[priority];
  return <Badge className={style}>{text}</Badge>;
};

export default IssuePriorityBadge;
