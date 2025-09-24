import IssuesChart from "@/components/Issues/IssuesChart";
import IssuesSummary from "@/components/Issues/IssuesSummary";
import LatestIssues from "@/components/Issues/LatestIssues";
import { IssueStatus } from "@/db/schema";
import { trpc } from "@/trpc/server";

const HomePage = async () => {
  const issuesCountByStatus = await trpc.issues.getIssuesCountByStatus();

  const OpenIssues =
    issuesCountByStatus?.find((item) => item.status === IssueStatus.OPEN)
      ?.count || 0;
  const InProgressIssues =
    issuesCountByStatus?.find((item) => item.status === IssueStatus.IN_PROGRESS)
      ?.count || 0;
  const ClosedIssues =
    issuesCountByStatus?.find((item) => item.status === IssueStatus.CLOSED)
      ?.count || 0;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <IssuesSummary
          openIssues={OpenIssues}
          inProgressIssues={InProgressIssues}
          closedIssues={ClosedIssues}
        />
        <IssuesChart
          openIssues={OpenIssues}
          inProgressIssues={InProgressIssues}
          closedIssues={ClosedIssues}
        />
      </div>
      <div className="flex">
        <LatestIssues />
      </div>
    </div>
  );
};

export default HomePage;
