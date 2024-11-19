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
    <form onSubmit={handleSubmit} className="absolute bottom-12 left-12">
      <Button variant={"secondary"}>Oyunu Başlat</Button>
    </form>
  );
}
