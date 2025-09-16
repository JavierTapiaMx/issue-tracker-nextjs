import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { trpc } from "@/trpc/server";

const AssigneeSelect = async () => {
  const users = await trpc.users.getAll();

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Assign..." />
      </SelectTrigger>
      <SelectContent>
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
