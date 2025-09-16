import { trpc } from "@/trpc/client";

export const useUsers = () => {
  const users = trpc.users.getAll.useQuery();

  return { users };
};
