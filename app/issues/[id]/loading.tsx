import { Skeleton } from "@/components/ui/skeleton";

const LoadingIssueDetailsPage = async () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-4 h-8 w-1/4" />
      <div className="mb-4 flex flex-row items-center gap-4">
        <Skeleton className="h-4 w-1/12" />
        <Skeleton className="h-4 w-1/12" />
        <Skeleton className="h-4 w-1/12" />
      </div>
      <Skeleton className="h-[400px] w-full" />
    </div>
  );
};

export default LoadingIssueDetailsPage;
