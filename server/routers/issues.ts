import { eq } from "drizzle-orm";
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
    return await db.select().from(issuesTable);
  }),
  getById: procedure.input(getIssueSchema).query(async (opts) => {
    const { id } = opts.input;
    return await db.select().from(issuesTable).where(eq(issuesTable.id, id));
  }),
  add: procedure.input(addIssueSchema).mutation(async (opts) => {
    const { title, description } = opts.input;
    return await db.insert(issuesTable).values({ title, description });
  }),
  update: procedure.input(updateIssueSchema).mutation(async (opts) => {
    const { id, title, description, status, priority } = opts.input;
    return await db
      .update(issuesTable)
      .set({ title, description, status, priority })
      .where(eq(issuesTable.id, id));
  }),
  delete: procedure.input(deleteIssueSchema).mutation(async (opts) => {
    const { id } = opts.input;
    return await db.delete(issuesTable).where(eq(issuesTable.id, id));
  })
});
