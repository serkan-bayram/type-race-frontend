import { Game } from "@/routes/root";
import { useEffect, useState } from "react";

export function Timer() {
  const [timer, setTimer] = useState(60);

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

export function GameInfo({ game }: { game: Game }) {
  return (
    <div className="flex flex-col items-center justify-center text-white font-custom-noto pb-36">
      {game === "started" && <Timer />}
      {game === "finished" && <Score />}
    </div>
  );
}
