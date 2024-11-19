import { useRoomSocket } from "@/hooks";
import { socket } from "@/socket";
import { useEffect, useState } from "react";

export function Timer() {
  const { room } = useRoomSocket();

  if (!room) return null;

  return (
    <>
      <div className="text-2xl font-semibold">{room.secondsLeft}</div>
      <div>saniye kaldı</div>
    </>
  );
}

export function Score({ WPM }: { WPM: number }) {
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

  return (
    <div className="absolute flex flex-col items-center justify-center text-white font-custom-noto top-36">
      {room?.status === "started" && <Timer />}
      {room?.status === "finished" && <Score WPM={WPM} />}
    </div>
  );
}
