import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { createClerkClient, User } from "@clerk/backend";

const AssigneeSelect = async () => {
  const clerkClient = createClerkClient({
    secretKey: process.env.CLERK_SECRET_KEY
  });

  const { data: users } = await clerkClient.users.getUserList();

  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Assign..." />
      </SelectTrigger>
      <SelectContent>
        {users.map((user: User) => (
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
