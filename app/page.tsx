import IssuesSummary from "@/components/Issues/IssuesSummary";

const HomePage = () => {
  return (
    <div className="flex flex-row items-center justify-center p-8">
      <IssuesSummary openIssues={5} inProgressIssues={3} closedIssues={10} />
    </div>
  );
};

export default HomePage;
