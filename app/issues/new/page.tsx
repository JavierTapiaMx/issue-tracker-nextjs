"use client";

import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/components/Issues/IssueFormSkeleton";

const IssueForm = dynamic(() => import("@/components/Issues/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
