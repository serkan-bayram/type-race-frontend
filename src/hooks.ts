import { useState } from "react";
import { socket } from "./socket";

type Room = {
  roomId: string;
  secondsLeft: number;
  status?: "started" | "finished";
  users: { userName: string; id: string; isCreator: boolean; WPM: number }[];
};

export function useRoomSocket() {
  const [room, setRoom] = useState<undefined | Room>();

  socket.on("roomInfo", (room) => {
    setRoom(room);
  });

  return { room, setRoom };
}
