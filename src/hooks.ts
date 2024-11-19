import { useState } from "react";
import { socket } from "./socket";

type GameStatus = "started" | "finished";

type Room = {
  roomId: string;
  secondsLeft: number;
  status?: GameStatus;
  users: { userName: string; id: string; isCreator: boolean; WPM: number }[];
};

export function useRoomSocket() {
  const [room, setRoom] = useState<undefined | Room>();

  socket.on("roomInfo", (room) => {
    setRoom(room);
  });

  return { room, setRoom };
}
