"use client";

import { TRPCProvider as OriginalTRPCProvider } from "@/trpc/client";

export const TrpcProvider = ({ children }: { children: React.ReactNode }) => {
  return <OriginalTRPCProvider>{children}</OriginalTRPCProvider>;
};
