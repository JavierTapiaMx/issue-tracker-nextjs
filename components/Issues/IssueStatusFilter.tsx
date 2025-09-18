"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { IssueStatus } from "@/db/schema";
import { useRouter, useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams();

    const currentSortByParam = searchParams.get("sortBy");
    const currentOrderParam = searchParams.get("order");

    if (status !== "all") params.set("status", status);

    if (currentSortByParam) {
      params.set("sortBy", currentSortByParam);
    }

    if (currentOrderParam) {
      params.set("order", currentOrderParam);
    }

    router.push(`/issues?${params.toString()}`);
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
