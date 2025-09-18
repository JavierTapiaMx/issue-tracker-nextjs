"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { IssueStatus } from "@/db/schema";
import { useRouter } from "next/navigation";

const issueStatuses: { label: string; value: IssueStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Open", value: IssueStatus.OPEN },
  { label: "In Progress", value: IssueStatus.IN_PROGRESS },
  { label: "Closed", value: IssueStatus.CLOSED }
];

interface Props {
  currentStatus: IssueStatus | "all" | undefined;
}

const IssueStatusFilter = ({ currentStatus }: Props) => {
  const router = useRouter();

  const handleStatusChange = (status: string) => {
    const query = status === "all" ? "/issues" : `/issues?status=${status}`;
    router.push(query);
  };

  return (
    <Select onValueChange={handleStatusChange} defaultValue={currentStatus}>
      <SelectTrigger className="max-w-sm lg:w-full">
        <SelectValue placeholder="Filter by Status" />
      </SelectTrigger>
      <SelectContent>
        {issueStatuses.map((issueStatus) => (
          <SelectItem key={issueStatus.value} value={issueStatus.value || ""}>
            {issueStatus.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default IssueStatusFilter;
