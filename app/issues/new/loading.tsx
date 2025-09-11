import { Skeleton } from "@/components/ui/skeleton";

const LoadingNewIssuePage = async () => {
  return (
    <div className="max-w-xl space-y-3">
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/6" />
        <Skeleton className="h-8 w-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/6" />
        <Skeleton className="h-[400px] w-full" />
        <div className="flex flex-row justify-end gap-2">
          <Skeleton className="h-4 w-1/6" />
          <Skeleton className="h-4 w-1/6" />
        </div>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/6" />
        <Skeleton className="h-8 w-[180px]" />
      </div>
      <Skeleton className="mt-4 h-8 w-full" />
    </div>
  );
};

export default LoadingNewIssuePage;
