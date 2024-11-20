import { FormEvent } from "react";
import { Button } from "./ui/button";
import { useRoomSocket, useStartGameSocket } from "@/hooks";
import { socket } from "@/socket";

export function StartGame() {
  useStartGameSocket();

  const { room } = useRoomSocket();

  if (!room) return null;

  const currentUser = room.users.find((user) => user.id === socket.id);

  if (!currentUser?.isCreator || room.status) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("startGame", { roomId: room.roomId });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute -translate-x-1/2 bottom-12 sm:translate-x-0 sm:left-12 left-1/2"
    >
      <Button variant={"secondary"}>Start Game</Button>
    </form>
  );
}
