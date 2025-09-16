import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "@/server/trpc";
import { appRouter } from "@/server/root";

const handler = async (req: Request) => {
  try {
    return await fetchRequestHandler({
      endpoint: "/api/trpc",
      req,
      router: appRouter,
      createContext: createTRPCContext,
      onError: ({ path, error, type, ctx }) => {
        console.error(
          `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
        );

        // Log additional context in development
        if (process.env.NODE_ENV === "development") {
          console.error("Error details:", {
            type,
            path,
            error: error.stack,
            ctx: ctx ? "Context available" : "No context"
          });
        }
      },
      responseMeta: ({ ctx, paths, type, errors }) => {
        // Set cache headers for queries
        if (type === "query" && errors.length === 0) {
          return {
            headers: {
              "Cache-Control": "s-maxage=60, stale-while-revalidate=300"
            }
          };
        }
        return {};
      }
    });
  } catch (error) {
    console.error("❌ Unhandled error in tRPC handler:", error);

    return new Response(
      JSON.stringify({
        error: "Internal server error",
        ...(process.env.NODE_ENV === "development" && {
          details: error instanceof Error ? error.message : "Unknown error"
        })
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};

export { handler as GET, handler as POST };
