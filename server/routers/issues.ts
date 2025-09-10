import { db } from "@/db/drizzle";
import { issuesTable } from "@/db/schema";
import { publicProcedure, router } from "@/server/trpc";

export const issuesRouter = router({
  getAll: publicProcedure.query(async () => {
    return db.select().from(issuesTable);
  })
});
