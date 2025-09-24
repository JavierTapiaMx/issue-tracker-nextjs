"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

const chartConfig = {
  value: {
    label: "Issues",
    color: "var(--chart-1)"
  }
} satisfies ChartConfig;

interface Props {
  openIssues: number;
  inProgressIssues: number;
  closedIssues: number;
}

const IssuesChart = ({ openIssues, inProgressIssues, closedIssues }: Props) => {
  const chartData = [
    { status: "Open", value: openIssues },
    { status: "In Progress", value: inProgressIssues },
    { status: "Closed", value: closedIssues }
  ];

  return (
    <Card className="w-full">
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="status"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="var(--color-value)" radius={6} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default IssuesChart;
