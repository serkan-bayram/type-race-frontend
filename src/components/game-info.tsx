import { useRoomSocket } from "@/hooks";

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

export function Score() {
  return (
    <>
      <div className="text-2xl">72</div>
      <div>Words Per Minute</div>
    </>
  );
}

export function GameInfo() {
  const { room } = useRoomSocket();

  return (
    <div className="absolute flex flex-col items-center justify-center text-white font-custom-noto top-36">
      {room?.status === "started" && <Timer />}
      {room?.status === "finished" && <Score />}
    </div>
  );
}
