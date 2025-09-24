import { db } from "@/db/drizzle";
import { issuesTable, IssueStatus } from "@/db/schema";
import {
  addIssueSchema,
  getIssuesSchema,
  updateIssueSchema
} from "@/lib/validations/issue";
import { procedure, router } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { asc, desc, eq, count } from "drizzle-orm";
import z from "zod";

export const issuesRouter = router({
  getIssuesCount: procedure.input(getIssuesSchema).query(async ({ input }) => {
    const { status } = input;

    try {
      if (status && status !== "all") {
        const result = await db
          .select({ count: count() })
          .from(issuesTable)
          .where(eq(issuesTable.status, status));

        return result[0].count;
      }

      const result = await db.select({ count: count() }).from(issuesTable);

      return result[0].count;
    } catch (error) {
      console.error("Database error when fetching issues count:", error);

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
        message: "Failed to fetch issues count from database",
        cause: error
      });
    }
  }),
  getIssues: procedure.input(getIssuesSchema).query(async ({ input }) => {
    const { status, sortBy, order } = input;

    try {
      const baseQuery = db.select().from(issuesTable);

      if (status && status !== "all" && sortBy) {
        const sortDirection = order === "desc" ? desc : asc;
        const column = issuesTable[sortBy];

        const issues = await baseQuery
          .where(eq(issuesTable.status, status))
          .orderBy(sortDirection(column))
          .offset((input.page - 1) * input.pageSize)
          .limit(input.pageSize);

        return issues;
      } else if (status && status !== "all") {
        const issues = await baseQuery
          .where(eq(issuesTable.status, status))
          .offset((input.page - 1) * input.pageSize)
          .limit(input.pageSize);

        return issues;
      } else if (sortBy) {
        const sortDirection = order === "desc" ? desc : asc;
        const column = issuesTable[sortBy];
        const issues = await baseQuery
          .orderBy(sortDirection(column))
          .offset((input.page - 1) * input.pageSize)
          .limit(input.pageSize);

        return issues;
      } else {
        const issues = await baseQuery
          .offset((input.page - 1) * input.pageSize)
          .limit(input.pageSize);

        return issues;
      }
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
  getLatest: procedure.query(async () => {
    try {
      const issues = await db
        .select()
        .from(issuesTable)
        .orderBy(desc(issuesTable.createdAt))
        .limit(5);
      return issues;
    } catch (error) {
      console.error("Database error when fetching latest issues:", error);

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to fetch latest issues from database",
        cause: error
      });
    }
  }),
  getById: procedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const { id } = input;

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

        console.error("Database error when fetching issue by Id:", error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch issue from database",
          cause: error
        });
      }
    }),
  getByStatus: procedure
    .input(z.object({ status: z.enum(IssueStatus) }))
    .query(async ({ input }) => {
      const { status } = input;

      try {
        const issues = await db
          .select()
          .from(issuesTable)
          .where(eq(issuesTable.status, status));
        return issues;
      } catch (error) {
        console.error("Database error when fetching issues by status:", error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch issues by status from database",
          cause: error
        });
      }
    }),
  add: procedure.input(addIssueSchema).mutation(async ({ input, ctx }) => {
    const { isAuthenticated } = ctx.auth;

    if (!isAuthenticated) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to create an issue"
      });
    }

    const { title, description, priority } = input;

    try {
      // Status defaults to OPEN for new issues (handled by schema default)
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
  update: procedure
    .input(
      z.object({
        id: z.number(),
        ...updateIssueSchema.omit({ id: true }).partial().shape
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { isAuthenticated } = ctx.auth;

      if (!isAuthenticated) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to update an issue"
        });
      }

      const { id, ...updateFields } = input;

      if (id === undefined) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Issue ID is required"
        });
      }

      // Remove undefined fields to only update provided values
      const fieldsToUpdate = Object.fromEntries(
        Object.entries(updateFields).filter(([, value]) => value !== undefined)
      );

      // Check if there are any fields to update
      if (Object.keys(fieldsToUpdate).length === 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No fields provided for update"
        });
      }

      try {
        await db
          .update(issuesTable)
          .set(fieldsToUpdate)
          .where(eq(issuesTable.id, id));

        return { success: true };
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error; // Re-throw TRPCErrors as-is
        }

        console.error("Database error when updating issue:", error);

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update issue",
          cause: error
        });
      }
    }),
  delete: procedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const { isAuthenticated } = ctx.auth;

      if (!isAuthenticated) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to delete an issue"
        });
      }

      const { id } = input;

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
