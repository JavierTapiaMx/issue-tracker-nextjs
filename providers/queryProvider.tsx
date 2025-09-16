"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

// Type definitions for better error handling
interface ApiError extends Error {
  status?: number;
  code?: string;
}

// Factory function for QueryClient with proper typing
const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes (replaces cacheTime)
        retry: (failureCount: number, error: unknown) => {
          // Don't retry on 4xx errors
          if (
            error &&
            typeof error === "object" &&
            "status" in error &&
            typeof (error as ApiError).status === "number"
          ) {
            const apiError = error as ApiError;
            if (
              apiError.status &&
              apiError.status >= 400 &&
              apiError.status < 500
            ) {
              return false;
            }
          }
          return failureCount < 3;
        },
        refetchOnWindowFocus: false
      },
      mutations: {
        retry: 1
      }
    }
  });

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
};
