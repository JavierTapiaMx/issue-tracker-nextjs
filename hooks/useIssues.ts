import type { AddIssueInput, UpdateIssueInput } from "@/lib/validations/issue";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useIssues = () => {
  const utils = trpc.useUtils();

  const issues = trpc.issues.getAll.useQuery();

  const addIssueMutation = trpc.issues.add.useMutation({
    onSuccess: () => {
      // Invalidate all issues queries after successful add
      utils.issues.getAll.invalidate();
    }
  });

  const updateIssueMutation = trpc.issues.update.useMutation({
    onSuccess: async (_, variables) => {
      // Multiple cache invalidation strategies for immediate updates

      // 1. Invalidate both getAll and getById queries
      await utils.issues.getAll.invalidate();
      await utils.issues.getById.invalidate({ id: variables.id });

      // 2. Force immediate refetch of the specific issue
      await utils.issues.getById.refetch({ id: variables.id });

      // 3. Reset/remove specific query from cache
      utils.issues.getById.reset({ id: variables.id });
    }
  });

  const deleteIssueMutation = trpc.issues.delete.useMutation({
    onSuccess: () => {
      // Invalidate all issues queries after successful delete
      utils.issues.getAll.invalidate();
    }
  });

  const router = useRouter();

  // Removed getIssueById function since it violates Rules of Hooks
  // Components should use trpc.issues.getById.useQuery directly

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
    if (!values.id) {
      toast.error("Issue Id is required for update");
      return;
    }

    try {
      await updateIssueMutation.mutateAsync({
        id: values.id,
        title: values.title,
        description: values.description,
        status: values.status,
        priority: values.priority,
        assignedToUserId: values.assignedToUserId
      });
      toast.success("Issue updated successfully!");
      router.push("/issues");
    } catch (error) {
      console.error("Error updating issue:", error);
      toast.error("An error occurred while updating the issue.");
    }
  };

  const deleteIssue = async (id: number) => {
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
