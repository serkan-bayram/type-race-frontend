import { useEffect, useState } from "react";
import { socket } from "./socket";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;

export type User = {
  userName: string;
  id: string;
  isCreator: boolean;
  WPM: number;
};

type Room = {
  roomId: string;
  secondsLeft: number;
  status?: "started" | "finished";
  users: User[];
};

export function useRoomSocket() {
  const [room, setRoom] = useState<undefined | Room>();

  useEffect(() => {
    const handleSocket = (room: Room) => {
      setRoom(room);
    };

    socket.on("roomInfo", handleSocket);

    return () => {
      socket.off("roomInfo", handleSocket);
    };
  }, []);

  return { room, setRoom };
}

export function useStartGameSocket() {
  useEffect(() => {
    const handleSocket = (response: string) => {
      if (response !== "Success") {
        toast.error(response);
        return;
      }

      const promise = new Promise((resolve) => setTimeout(resolve, 3000));

      toast.promise(promise, { loading: "Game is starting in 3 seconds." });
    };

    socket.on("startGame", handleSocket);

    return () => {
      socket.off("startGame", handleSocket);
    };
  }, []);
}

export function useJoinGameSocket() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSocket = (response: { ok: boolean; data: string }) => {
      if (!response.ok) {
        toast.error(response.data);
        navigate("/");
        return;
      }

      navigate(`/${response.data}`);
    };

    socket.on("joinRoom", handleSocket);

    return () => {
      socket.off("joinRoom", handleSocket);
    };
  }, []);
}

export function useWords() {
  return useQuery({
    queryKey: ["words"],
    queryFn: () => axios.get("/words/turkish"),
  });
}
