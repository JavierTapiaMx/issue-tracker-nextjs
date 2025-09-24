import IssuesChart from "@/components/Issues/IssuesChart";

const HomePage = () => {
  return (
    <div className="flex flex-row items-center justify-center p-8">
      <IssuesChart openIssues={5} inProgressIssues={3} closedIssues={10} />
    </div>
  );
};

export default HomePage;
