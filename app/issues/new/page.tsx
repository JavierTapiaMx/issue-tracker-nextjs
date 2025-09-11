"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import Link from "next/link";
import { addIssueSchema, type AddIssueInput } from "@/lib/validations/issue";
import { useIssues } from "@/hooks/useIssues";
import { IssuePriorities } from "@/db/schema";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false
});

const NewIssuePage = () => {
  const { addIssue, isPending: isSubmitting } = useIssues();

  const form = useForm<AddIssueInput>({
    resolver: zodResolver(addIssueSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: IssuePriorities.LOW
    }
  });

  const callOutStyle =
    "rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700";

  return (
    <div className="flex flex-row justify-center">
      <div className="container flex flex-col items-center px-4 py-8">
        <h1 className="mb-4 text-2xl font-bold">New Issue</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(
              async (values) => await addIssue(values)
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
            <div className="mt-4 flex flex-row items-center justify-end gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Spinner /> Submitting...
                  </span>
                ) : (
                  "Submit New Issue"
                )}
              </Button>
              <Button variant="outline">
                <Link className="text-muted-foreground text-sm" href="/issues">
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

export default NewIssuePage;
