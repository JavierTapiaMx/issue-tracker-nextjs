import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const LoadingIssueDetailsPage = async () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="mb-4 h-8 w-1/4" />
      <div className="mb-4 flex flex-row items-center gap-4">
        <Skeleton className="h-4 w-1/12" />
        <Skeleton className="h-4 w-1/12" />
        <Skeleton className="h-4 w-1/12" />
      </div>
      <Card className="h-[400px] w-full">
        <CardContent>
          <Skeleton className="mb-7 h-4 w-1/12" />
          <Skeleton className="mb-4 h-8 w-1/4" />
          <Skeleton className="mb-4 h-4 w-full" />
          <Skeleton className="mb-4 h-4 w-full" />
          <Skeleton className="mb-4 h-4 w-1/2" />
        </CardContent>
      </Card>
      <Skeleton className="mt-4 h-8 w-1/12" />
    </div>
  );
};

export default LoadingIssueDetailsPage;
