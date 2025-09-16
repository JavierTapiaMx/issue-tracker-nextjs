import { issuesRouter } from "./routers/issues";
import { usersRouter } from "./routers/users";
import { router } from "./trpc";

export const appRouter = router({
  issues: issuesRouter,
  users: usersRouter
});

export type AppRouter = typeof appRouter;
