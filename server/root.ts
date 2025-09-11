import { issuesRouter } from "./routers/issues";
import { router } from "./trpc";

export const appRouter = router({
  issues: issuesRouter
});

export type AppRouter = typeof appRouter;
