import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

const LoadingIssueDetailsPage = () => {
  return (
    <div className="container mx-auto grid gap-4 px-4 py-8 lg:grid-cols-5">
      <div className="mb-6 flex flex-col gap-4 lg:col-span-4">
        <Skeleton className="h-8 w-2/3" />
        <div className="mb-4 flex flex-row items-center gap-4">
          <Skeleton className="h-4 w-1/12" />
          <Skeleton className="h-4 w-1/12" />
          <Skeleton className="h-4 w-1/3" />
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

      <div className="flex flex-row gap-2 lg:flex-col">
        <Skeleton className="h-8 w-1/6 lg:w-full" />
        <Skeleton className="h-8 w-1/4 lg:w-full" />
      </div>
    </div>
  );
};

export default LoadingIssueDetailsPage;
