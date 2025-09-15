import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const LoadingIssueDetailsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-8 w-1/2" />
          <div className="mt-2 flex flex-row items-center gap-4">
            <Skeleton className="h-4 w-1/12" />
            <Skeleton className="h-4 w-1/12" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      </div>

      <Card className="h-[400px] w-full">
        <CardContent>
          <Skeleton className="mt-8 mb-7 h-4 w-1/8" />
          <Skeleton className="mb-4 h-4 w-full" />
          <Skeleton className="mb-4 h-4 w-full" />
          <Skeleton className="mb-4 h-4 w-1/2" />
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingIssueDetailsPage;
