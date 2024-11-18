import { useEffect, useState } from "react";
import { useUpdateRoomStatus } from "@/queries/queries";
import { useGameStatus } from "@/lib/game-status-context";
import { useParams } from "react-router-dom";

export function Timer() {
  const [timer, setTimer] = useState(60);

  const mutation = useUpdateRoomStatus();

  const { setGameStatus } = useGameStatus();

  const { roomId } = useParams();

  useEffect(() => {
    // TODO: Now, everyone in room sends this request
    // But only the one who is admin should send it
    if (timer <= 0) {
      if (roomId) {
        mutation.mutate({
          status: "finished",
        });
      } else {
        setGameStatus("finished");
      }
    }
  }, [timer]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((time) => {
        if (time >= 1) return time - 1;
        else return time;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="text-2xl font-semibold">{timer}</div>
      <div>saniye kaldı</div>
    </>
  );
}

export function Score() {
  return (
    <>
      <div className="text-2xl">72</div>
      <div>Words Per Minute</div>
    </>
  );
}

export function GameInfo() {
  const { gameStatus } = useGameStatus();

  return (
    <div className="absolute flex flex-col items-center justify-center text-white font-custom-noto top-36">
      {gameStatus === "started" && <Timer />}
      {gameStatus === "finished" && <Score />}
    </div>
  );
}
