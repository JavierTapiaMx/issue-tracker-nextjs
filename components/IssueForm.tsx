"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { IssuePriorities, IssueStatus } from "@/db/schema";
import { useIssues } from "@/hooks/useIssues";
import { IssueInput, issueSchema } from "@/lib/validations/issue";
import { Issue } from "@/types/Issue";
import { zodResolver } from "@hookform/resolvers/zod";
import "easymde/dist/easymde.min.css";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { HiOutlineSave } from "react-icons/hi";
import SimpleMDE from "react-simplemde-editor";

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const { addIssue, updateIssue, isPending: isSubmitting } = useIssues();

  const form = useForm<IssueInput>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: issue?.title || "",
      description: issue?.description || "",
      status: issue?.status || IssueStatus.OPEN,
      priority: issue?.priority || IssuePriorities.LOW
    }
  });

  const callOutStyle =
    "rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700";

  return (
    <div className="flex flex-row justify-center">
      <div className="container flex flex-col items-center px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold">
          {issue ? "Edit Issue" : "New Issue"}
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              issue
                ? async (values) =>
                    await updateIssue({ id: issue.id, ...values })
                : async (values) => await addIssue(values)
            )}
            className="w-full max-w-xl space-y-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage className={callOutStyle} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <SimpleMDE placeholder="Description" {...field} />
                  </FormControl>
                  <FormMessage className={callOutStyle} />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className={callOutStyle} />
                </FormItem>
              )}
            />
            <div className="mt-4 flex flex-row items-center gap-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer"
              >
                <HiOutlineSave className="h-4 w-4" />
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Spinner /> {issue ? "Updating..." : "Submitting..."}
                  </span>
                ) : (
                  <>{issue ? "Update Issue" : "Submit New Issue"}</>
                )}
              </Button>
              <Button variant="outline">
                <Link
                  className="text-muted-foreground text-sm"
                  href={issue ? `/issues/${issue.id}` : "/issues"}
                >
                  Cancel
                </Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default IssueForm;
