import { db } from "@/db/drizzle";
import { z } from "zod";
import { issuesTable } from "@/db/schema";
import { procedure, router } from "@/server/trpc";

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1)
});

export const issuesRouter = router({
  getAll: procedure.query(async () => {
    return await db.select().from(issuesTable);
  }),
  add: procedure.input(createIssueSchema).mutation(async (opts) => {
    const { title, description } = opts.input;
    return await db.insert(issuesTable).values({ title, description });
  })
});
