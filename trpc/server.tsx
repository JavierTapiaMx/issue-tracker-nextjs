import "server-only";

import { createHydrationHelpers } from "@trpc/react-query/rsc";
import { cache } from "react";
import { createCallerFactory } from "@/server/trpc";
import { createContext } from "@/server/context";
import { makeQueryClient } from "./query-client";
import { appRouter } from "@/server/root";

export const getQueryClient = cache(makeQueryClient);

const caller = createCallerFactory(appRouter)(createContext);

export const { trpc, HydrateClient } = createHydrationHelpers<typeof appRouter>(
  caller,
  getQueryClient
);
