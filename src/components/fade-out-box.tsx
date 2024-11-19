import { cn } from "@/lib/utils";

export function FadeOutBox({
  direction,
}: {
  direction: "bg-gradient-to-r" | "bg-gradient-to-l";
}) {
  return (
    <div
      className={cn("flex-1 z-10  h-full from-[#0C0C0C] from-50%", direction)}
    ></div>
  );
}
