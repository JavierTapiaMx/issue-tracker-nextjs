"use client";

import { Issue } from "@/types/Issue";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export const columns: ColumnDef<Issue>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      const status = row.getValue("status") as string;
      const priority = row.getValue("priority") as string;
      const date = row.getValue("createdAt") as Date;

      return (
        <div className="space-y-1">
          <div className="font-medium">{title}</div>
          {/* Mobile-only: Show additional info below title */}
          <div className="text-muted-foreground block space-y-1 text-sm sm:hidden">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
                {status.replace("_", " ").toUpperCase()}
              </span>
              <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                {priority.toUpperCase()}
              </span>
            </div>
            <div className="text-muted-foreground text-xs">
              {date.toLocaleDateString(undefined, {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
              })}
            </div>
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-blue-700/10 ring-inset">
          {status.replace("_", " ").toUpperCase()}
        </span>
      );
    }
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string;
      return (
        <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
          {priority.toUpperCase()}
        </span>
      );
    }
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date = row.getValue("createdAt") as Date;
      return (
        <span className="text-muted-foreground text-sm">
          {date.toLocaleDateString(undefined, {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          })}
        </span>
      );
    }
  }
];

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

function DataTable<TData, TValue>({ columns, data }: Props<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="bg-background w-full overflow-hidden rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => {
                  // Hide columns on mobile except the first one (title)
                  const hiddenOnMobile =
                    index > 0 ? "hidden sm:table-cell" : "";

                  return (
                    <TableHead key={header.id} className={hiddenOnMobile}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell, index) => {
                    // Hide columns on mobile except the first one (title)
                    const hiddenOnMobile =
                      index > 0 ? "hidden sm:table-cell" : "";

                    return (
                      <TableCell key={cell.id} className={hiddenOnMobile}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

interface IssuesTableProps {
  issues: Issue[];
}

const IssuesTable = ({ issues }: IssuesTableProps) => {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium tracking-tight">Issues</h2>
        <div className="text-muted-foreground text-sm">
          {issues.length} {issues.length === 1 ? "issue" : "issues"}
        </div>
      </div>
      <div className="bg-card rounded-lg border">
        <DataTable columns={columns} data={issues} />
      </div>
    </div>
  );
};

export default IssuesTable;
