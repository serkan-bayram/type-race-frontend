import { useState } from "react";
import { socket } from "./socket";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;

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

export function useWords() {
  return useQuery({
    queryKey: ["words"],
    queryFn: () => axios.get("/words/turkish"),
  });
}
