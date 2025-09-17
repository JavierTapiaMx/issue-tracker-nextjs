import { procedure, router } from "@/server/trpc";
import { createClerkClient } from "@clerk/backend";
import { TRPCError } from "@trpc/server";
import z from "zod";

export const usersRouter = router({
  getAll: procedure.query(async () => {
    try {
      const clerkClient = createClerkClient({
        secretKey: process.env.CLERK_SECRET_KEY
      });

      const users = await clerkClient.users
        .getUserList()
        .then((res) => res.data);
      return users;
    } catch (error) {
      console.error("Error fetching users from Clerk:", error);

      if (error instanceof Error) {
        // Handle specific Clerk errors
        if (
          error.message.includes("Unauthorized") ||
          error.message.includes("Invalid")
        ) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid Clerk configuration or API key",
            cause: error
          });
        }
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch users",
        cause: error
      });
    }
  }),
  getById: procedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const { id } = input;

      try {
        const clerkClient = createClerkClient({
          secretKey: process.env.CLERK_SECRET_KEY
        });

        const user = await clerkClient.users.getUser(id);
        return user;
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error; // Re-throw TRPCErrors as-is
        }

        console.error("Error fetching user by Id from Clerk:", error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch user from Clerk",
          cause: error
        });
      }
    })
});
