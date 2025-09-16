import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const AssigneeSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Assign..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">User 1</SelectItem>
        <SelectItem value="2">User 2</SelectItem>
        <SelectItem value="3">User 3</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default AssigneeSelect;
