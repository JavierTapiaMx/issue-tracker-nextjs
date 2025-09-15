import Link from "next/link";
import { FaRegTrashAlt } from "react-icons/fa";
import { Button } from "../ui/button";

interface Props {
  issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
  return (
    <Button variant="destructive">
      <FaRegTrashAlt className="h-4 w-4" />
      <Link href={`/issues/${issueId}/delete`}>Delete</Link>
    </Button>
  );
};

export default DeleteIssueButton;
