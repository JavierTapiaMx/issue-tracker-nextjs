import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { trpc } from "@/trpc/server";

const AssigneeSelect = async () => {
  let users;

  try {
    users = await trpc.users.getAll();
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }

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
