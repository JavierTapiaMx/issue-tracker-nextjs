import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import { db } from "@/db/drizzle";
import { issuesTable } from "@/db/schema";
import {
  getIssueSchema,
  addIssueSchema,
  updateIssueSchema,
  deleteIssueSchema
} from "@/lib/validations/issue";
import { procedure, router } from "@/server/trpc";

export const issuesRouter = router({
  getAll: procedure.query(async () => {
    try {
      const issues = await db.select().from(issuesTable);
      return issues;
    } catch (error) {
      console.error("Database error when fetching issues:", error);

      // Check if it's a database connection error
      if (error instanceof Error) {
        if (
          error.message.includes("connect") ||
          error.message.includes("connection")
        ) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message:
              "Database connection failed. Please check your database configuration.",
            cause: error
          });
        }
      }

      // Generic database error
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch issues from database",
        cause: error
      });
    }
  }),
  getById: procedure.input(getIssueSchema).query(async (opts) => {
    const { id } = opts.input;
    try {
      const result = await db
        .select()
        .from(issuesTable)
        .where(eq(issuesTable.id, id));

      if (result.length === 0) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `Issue with ID ${id} not found`
        });
      }

      return result[0];
    } catch (error) {
      if (error instanceof TRPCError) {
        throw error; // Re-throw TRPCErrors as-is
      }

      console.error("Database error when fetching issue by ID:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch issue from database",
        cause: error
      });
    }
  }),
  add: procedure.input(addIssueSchema).mutation(async (opts) => {
    const { title, description, priority } = opts.input;
    try {
      await db.insert(issuesTable).values({ title, description, priority });
      return { success: true };
    } catch (error) {
      console.error("Database error when creating issue:", error);

      // Check for constraint violations
      if (error instanceof Error && error.message.includes("constraint")) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Issue creation failed due to data constraints",
          cause: error
        });
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to create issue",
        cause: error
      });
    }
  }),
  update: procedure.input(updateIssueSchema).mutation(async (opts) => {
    const { id, title, description, status, priority } = opts.input;
    try {
      await db
        .update(issuesTable)
        .set({ title, description, status, priority })
        .where(eq(issuesTable.id, id));

      return { success: true };
    } catch (error) {
      console.error("Database error when updating issue:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to update issue",
        cause: error
      });
    }
  }),
  delete: procedure.input(deleteIssueSchema).mutation(async (opts) => {
    const { id } = opts.input;
    try {
      await db.delete(issuesTable).where(eq(issuesTable.id, id));
      return { success: true };
    } catch (error) {
      console.error("Database error when deleting issue:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to delete issue",
        cause: error
      });
    }
  })
});
