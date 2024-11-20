import { User, useRoomSocket } from "@/hooks";
import { socket } from "@/socket";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function Timer() {
  const { room } = useRoomSocket();

  if (!room) return null;

  return (
    <>
      <div className="text-2xl font-semibold">{room.secondsLeft}</div>
      <div>seconds left</div>
    </>
  );
}

export function Score({
  WPM,
  winner,
}: {
  WPM: number;
  winner: User | undefined;
}) {
  useEffect(() => {
    if (winner) {
      toast.success(`Winner is ${winner.userName} with ${winner.WPM} WPM!`);
    }
  }, []);

  return (
    <>
      <div className="text-2xl">{WPM}</div>
      <div>Words Per Minute</div>
    </>
  );
}

export function GameInfo({
  history,
  wordsList,
}: {
  history: string[];
  wordsList: string[];
}) {
  const { room } = useRoomSocket();

  const [WPM, setWPM] = useState(0);

  const winner = room?.users.sort((a, b) => b.WPM - a.WPM)[0];

  useEffect(() => {
    const grossWPM =
      history.reduce((prev, current) => prev + current.length, 0) / 5;

    let errorCount = 0;

    history.forEach((historyWord, index) => {
      const typedLetters = historyWord.split("");

      if (typedLetters.length === 0) return;

      const originalLetters = wordsList[index].split("");

      for (let index = 0; index < typedLetters.length; index++) {
        if (typedLetters[index] !== originalLetters[index]) {
          errorCount += 1;
        }
      }
    });

    const netWPM = parseInt((grossWPM - errorCount).toFixed(0));

    setWPM(netWPM);

    socket.emit("type", { WPM: netWPM, roomId: room?.roomId });
  }, [history]);

  if (!room?.status) return null;

  return (
    <div className="flex flex-col items-center justify-center text-white font-custom-noto">
      {room?.status === "started" && <Timer />}
      {room?.status === "finished" && <Score winner={winner} WPM={WPM} />}
    </div>
  );
}
