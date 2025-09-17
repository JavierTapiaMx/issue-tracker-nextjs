"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useIssues } from "@/hooks/useIssues";
import { trpc } from "@/trpc/client";
import { Skeleton } from "../ui/skeleton";

interface Props {
  issueId: number;
  assignedToUserId?: string | null;
}

const AssigneeSelect = ({ issueId, assignedToUserId }: Props) => {
  const { data: users = [], isLoading } = trpc.users.getAll.useQuery();
  const { updateIssue, isPending: isUpdating } = useIssues();

  if (isLoading) {
    return <Skeleton className="h-10 w-full" />;
  }

  if (!users) {
    return null;
  }

  const handleUserChange = (userId: string) => {
    updateIssue({
      id: issueId,
      assignedToUserId: userId === "unassigned" ? null : userId
    });
  };

  return (
    <Select
      defaultValue={assignedToUserId ?? "unassigned"}
      onValueChange={handleUserChange}
      disabled={isUpdating}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Assign..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unassigned">Unassigned</SelectItem>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.firstName} {user.lastName} (
            {user.emailAddresses[0]?.emailAddress})
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AssigneeSelect;
