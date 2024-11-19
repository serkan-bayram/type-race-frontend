import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction } from "react";
import { Input } from "./ui/input";
import { useRoomSocket } from "@/hooks";
import { toast } from "sonner";

export function WordInput({
  history,
  setHistory,
  wordsList,
}: {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  wordsList: string[];
}) {
  const { room } = useRoomSocket();

  const historyLastIndex = history.length - 1;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (history[historyLastIndex].length === 0 && history.length > 1) {
        setHistory((history) => {
          const historyCopy = [...history];

          historyCopy.pop();

          return historyCopy;
        });
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;

    // If Space is pressed
    if (
      newInput.charAt(newInput.length - 1) === " " &&
      history.length < wordsList.length
    ) {
      setHistory((history) => {
        const historyCopy = [...history];

        historyCopy.push("");

        return historyCopy;
      });

      return;
    }

    setHistory((history) => {
      const historyCopy = [...history];

      historyCopy[historyLastIndex] = newInput;

      return historyCopy;
    });
  };

  const handleMouseOver = () => {
    if (!room) {
      toast.info("Create a room or join one to start");
    } else {
      if (!room?.status) {
        toast.info("Game has not started yet");
      }
    }
  };

  return (
    <Input
      onMouseOver={handleMouseOver}
      disabled={room?.status !== "started"}
      value={history[historyLastIndex]}
      onKeyDown={handleKeyDown}
      onChange={handleChange}
      placeholder="Start typing"
      className="w-[500px] text-lg py-6 mt-12 rounded-xl text-white placeholder:text-white bg-white/10 shadow-xl border-none"
    />
  );
}
