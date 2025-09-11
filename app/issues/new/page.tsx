"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { addIssueSchema, type AddIssueInput } from "@/lib/validations/issue";
import { useIssues } from "@/hooks/useIssues";

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
import "easymde/dist/easymde.min.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false
});

const NewIssuePage = () => {
  const { addIssue, isLoading } = useIssues();

  const form = useForm<AddIssueInput>({
    resolver: zodResolver(addIssueSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  });

  const onSubmit = async (values: AddIssueInput) => {
    await addIssue(values);
  };

  const callOutStyle =
    "rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl space-y-3"
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Submit New Issue"}
        </Button>
      </form>
    </Form>
  );
};

export default NewIssuePage;
