import { FormEvent } from "react";
import { Button } from "./ui/button";
import { useRoomSocket } from "@/hooks";
import { socket } from "@/socket";
import { toast } from "sonner";

export function StartGame() {
  const { room } = useRoomSocket();

  if (!room) return null;

  const currentUser = room.users.find((user) => user.id === socket.id);

  if (!currentUser?.isCreator) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit("startGame", { roomId: room.roomId });

    socket.on("startGame", (response) => {
      if (response !== "Success") {
        toast.error(response);
        return;
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="absolute bottom-12 left-12">
      <Button variant={"secondary"}>Oyunu Başlat</Button>
    </form>
  );
}
