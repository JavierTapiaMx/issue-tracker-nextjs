import { initTRPC } from "@trpc/server";
import { cache } from "react";
import superjson from "superjson";

export const createTRPCContext = cache(async () => {
  return { userId: "user_123" };
});

const t = initTRPC.create({
  transformer: superjson
});

// Base router and procedure helpers
export const router = t.router;
export const procedure = t.procedure;
export const createCallerFactory = t.createCallerFactory;
