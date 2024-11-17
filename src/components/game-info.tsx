import { useEffect, useState } from "react";
import { useGetRoom, useUpdateRoomStatus } from "@/queries/queries";
import { RoomGet } from "@/types/api";

export function Timer() {
  const [timer, setTimer] = useState(60);

  const mutation = useUpdateRoomStatus();

  useEffect(() => {
    // TODO: Now, everyone in room sends this request
    // But only the one who is admin should send it
    if (timer <= 0) {
      mutation.mutate({
        status: "finished",
      });
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
  const roomQuery = useGetRoom();

  const roomStatus = (roomQuery.data?.data as RoomGet)?.room.status;

  return (
    <div className="flex flex-col items-center justify-center text-white font-custom-noto pb-36">
      {roomStatus === "started" && <Timer />}
      {roomStatus === "finished" && <Score />}
    </div>
  );
}
