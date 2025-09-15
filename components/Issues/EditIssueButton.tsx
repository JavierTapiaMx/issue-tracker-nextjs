import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RxPencil2 } from "react-icons/rx";

interface Props {
  issueId: number;
}

const EditIssueButton = ({ issueId }: Props) => {
  return (
    <Button>
      <RxPencil2 className="h-4 w-4" />
      <Link href={`/issues/${issueId}/edit`}>Edit</Link>
    </Button>
  );
};

export default EditIssueButton;
