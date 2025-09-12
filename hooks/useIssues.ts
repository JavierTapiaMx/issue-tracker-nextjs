import { useRouter } from "next/navigation";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import type {
  GetIssueInput,
  AddIssueInput,
  UpdateIssueInput,
  DeleteIssueInput
} from "@/lib/validations/issue";

export const useIssues = () => {
  const issues = trpc.issues.getAll.useQuery();
  const addIssueMutation = trpc.issues.add.useMutation();
  const updateIssueMutation = trpc.issues.update.useMutation();
  const deleteIssueMutation = trpc.issues.delete.useMutation();
  const router = useRouter();

  const getIssueById = ({ id }: GetIssueInput) => {
    try {
      const issue = trpc.issues.getById.useQuery({ id });
      return issue;
    } catch (error) {
      console.error("Error fetching issue:", error);
      toast.error("An error occurred while fetching the issue.");
    }
  };

  const addIssue = async (values: AddIssueInput) => {
    try {
      await addIssueMutation.mutateAsync({
        title: values.title,
        description: values.description,
        priority: values.priority
      });
      toast.success("Issue created successfully!");
      router.push("/issues");
    } catch (error) {
      console.error("Error creating issue:", error);
      toast.error("An error occurred while creating the issue.");
    }
  };

  const updateIssue = async (values: UpdateIssueInput) => {
    try {
      await updateIssueMutation.mutateAsync({
        id: values.id,
        title: values.title,
        description: values.description,
        status: values.status,
        priority: values.priority
      });
      toast.success("Issue updated successfully!");
      router.push("/issues");
    } catch (error) {
      console.error("Error updating issue:", error);
      toast.error("An error occurred while updating the issue.");
    }
  };

  const deleteIssue = async ({ id }: DeleteIssueInput) => {
    try {
      await deleteIssueMutation.mutateAsync({ id });
      toast.success("Issue deleted successfully!");
      router.push("/issues");
    } catch (error) {
      console.error("Error deleting issue:", error);
      toast.error("An error occurred while deleting the issue.");
    }
  };

  return {
    issues: issues.data ?? [],
    getIssueById,
    addIssue,
    updateIssue,
    deleteIssue,
    isLoading: issues.isLoading,
    isPending:
      addIssueMutation.isPending ||
      updateIssueMutation.isPending ||
      deleteIssueMutation.isPending
  };
};
