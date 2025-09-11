"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";

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

const formSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required")
});

const NewIssuePage = () => {
  const addIssueMutation = trpc.issues.add.useMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await addIssueMutation
      .mutateAsync({
        title: values.title,
        description: values.description
      })
      .then(() => {
        toast.success("Issue created successfully!");
        router.push("/issues");
      })
      .catch((error) => {
        console.error("Error creating issue:", error);
        toast.error("An error occurred while creating the issue.");
      });
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
        <Button type="submit">Submit New Issue</Button>
      </form>
    </Form>
  );
};

export default NewIssuePage;
