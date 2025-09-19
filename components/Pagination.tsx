"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  LuChevronFirst,
  LuChevronLast,
  LuChevronLeft,
  LuChevronRight
} from "react-icons/lu";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "./ui/select";

interface Props {
  itemCount: number;
  pageSize: 5 | 10 | 20 | 30 | 40 | 50;
  currentPage: number;
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageSizeChange = (newSize: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("pageSize", newSize.toString());
    params.set("page", "1");

    router.push(`/issues?${params.toString()}`);
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", newPage.toString());
    router.push(`/issues?${params.toString()}`);
  };

  const totalPages = Math.ceil(itemCount / pageSize);

  if (totalPages === 0) return null;

  return (
    <div className="flex flex-row items-center justify-between p-4">
      <div className="flex flex-row items-center gap-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          onValueChange={(value) => handlePageSizeChange(parseInt(value))}
          defaultValue={pageSize.toString()}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select page size" />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20, 30, 40, 50].map((size) => (
              <SelectItem key={size} value={size.toString()}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-row items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        >
          <LuChevronFirst className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <LuChevronLeft className="h-4 w-4" />
        </Button>
        <div className="px-2 text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <LuChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          <LuChevronLast className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
