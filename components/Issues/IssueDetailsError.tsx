import Link from "next/link";
import { SlRefresh } from "react-icons/sl";
import { Button } from "../ui/button";

interface Props {
  issueId: number;
  errorMessage: string;
}

const IssueDetailsError = ({ issueId, errorMessage }: Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold">Issue Details</h1>
          <p className="text-muted-foreground">
            View and manage issue information
          </p>
        </div>
        <Button variant="outline">
          <Link href="/issues">Back to Issues</Link>
        </Button>
      </div>

      <div className="border-destructive/20 rounded-lg border-2 border-dashed py-12 text-center">
        <div className="mx-auto max-w-md">
          <h3 className="text-destructive mb-2 text-lg font-semibold">
            Unable to load issue
          </h3>
          <p className="text-muted-foreground mb-4">{errorMessage}</p>
          <div className="flex justify-center gap-2">
            <Button variant="outline">
              <SlRefresh className="h-4 w-4" />
              <Link
                href={`/issues/${issueId}`}
                className="flex items-center gap-2"
              >
                Try Again
              </Link>
            </Button>
            <Button>
              <Link href="/issues">Back to Issues</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssueDetailsError;
