import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Language() {
  return (
    <Select name="language" required defaultValue="turkish">
      <SelectTrigger className="w-1/3 bg-white">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="english">English</SelectItem>
        <SelectItem value="turkish">Turkish</SelectItem>
      </SelectContent>
    </Select>
  );
}
