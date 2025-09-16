import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

const LoadingIssuesPage = () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-foreground text-3xl font-bold">Issues</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your project issues
            </p>
          </div>
        </div>

        <div className="w-full space-y-4">
          <div className="bg-card rounded-lg border">
            <div className="bg-background w-full overflow-hidden rounded-md border">
              <div className="overflow-x-auto">
                <Table>
                  {/* <TableCaption className="text-muted-foreground mt-8 text-sm">
                    <Skeleton className="h-4 w-24" />
                  </TableCaption> */}
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Status
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Priority
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Created
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {issues.map((issue) => (
                      <TableRow key={issue} className="hover:bg-muted/50">
                        <TableCell className="space-y-2">
                          <div className="font-medium">
                            <Skeleton className="h-4 w-full md:w-xs lg:w-xl" />
                          </div>
                          {/* Mobile-only: Show additional info below title */}
                          <div className="text-muted-foreground block space-y-2 text-sm md:hidden">
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-4 w-1/6" />
                              <Skeleton className="h-4 w-1/6" />
                            </div>
                            <div className="text-muted-foreground text-xs">
                              <Skeleton className="h-4 w-3/12" />
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="h-4 w-16" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="h-4 w-16" />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Skeleton className="h-4 w-16" />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadingIssuesPage;
