import Link from "next/link";
import { FaRegPlusSquare } from "react-icons/fa";
import { Button } from "../ui/button";

const NoIssues = () => {
  return (
    <div className="border-border rounded-lg border-2 border-dashed py-12 text-center">
      <div className="mx-auto max-w-md">
        <h3 className="text-foreground mb-2 text-lg font-semibold">
          No issues yet
        </h3>
        <p className="text-muted-foreground mb-4">
          Get started by creating your first issue to track bugs, features, or
          tasks.
        </p>
        <Button>
          <FaRegPlusSquare className="h-4 w-4" />
          <Link href="/issues/new" className="flex items-center gap-2">
            Create your first issue
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NoIssues;
