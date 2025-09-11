import { Skeleton } from "@/components/ui/skeleton";

const LoadingNewIssuePage = async () => {
  return (
    <div className="flex flex-row justify-center">
      <div className="container flex flex-col items-center px-4 py-8">
        <div className="w-full max-w-xl space-y-3">
          <div className="mb-4 flex flex-row justify-center gap-4">
            <Skeleton className="h-8 w-1/3" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-[380px] w-full" />
            <div className="flex flex-row justify-end gap-2">
              <Skeleton className="h-4 w-1/6" />
              <Skeleton className="h-4 w-1/6" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/6" />
            <Skeleton className="h-8 w-2/6" />
          </div>
          <div className="flex flex-row justify-end gap-2">
            <Skeleton className="mt-4 h-8 w-3/12" />
            <Skeleton className="mt-4 h-8 w-1/6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingNewIssuePage;
