import Link from "next/link";
import { FaRegPlusSquare } from "react-icons/fa";
import { SlRefresh } from "react-icons/sl";
import { Button } from "../ui/button";

interface Props {
  errorMessage: string;
}

const IssuesError = ({ errorMessage }: Props) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex flex-row items-center justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-bold">Issues</h1>
          <p className="text-muted-foreground">
            Manage and track your project issues
          </p>
        </div>
        <Button>
          <FaRegPlusSquare className="h-4 w-4" />
          <Link href="/issues/new" className="flex items-center gap-2">
            New Issue
          </Link>
        </Button>
      </div>

      <div className="border-destructive/20 rounded-lg border-2 border-dashed py-12 text-center">
        <div className="mx-auto max-w-md">
          <h3 className="text-destructive mb-2 text-lg font-semibold">
            Unable to load issues
          </h3>
          <p className="text-muted-foreground mb-4">{errorMessage}</p>
          <div className="flex justify-center gap-2">
            <Button variant="outline">
              <SlRefresh className="h-4 w-4" />
              <Link href="/issues" className="flex items-center gap-2">
                Try Again
              </Link>
            </Button>
            <Button>
              <FaRegPlusSquare className="h-4 w-4" />
              <Link href="/issues/new">Create Issue Anyway</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IssuesError;
