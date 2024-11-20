import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

export function Language() {
  const [language, setLanguage] = useState("turkish");

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <Select
      defaultValue={localStorage.getItem("language") || "turkish"}
      onValueChange={setLanguage}
    >
      <SelectTrigger className="bg-white absolute bottom-12 right-12 w-[180px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="english">English</SelectItem>
        <SelectItem value="turkish">Turkish</SelectItem>
      </SelectContent>
    </Select>
  );
}
