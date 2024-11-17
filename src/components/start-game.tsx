import { FormEvent } from "react";
import { Button } from "./ui/button";
import { RoomGet } from "@/types/api";
import { useGetRoom, useUpdateRoomStatus } from "@/queries/queries";

export function StartGame() {
  const query = useGetRoom();

  const mutation = useUpdateRoomStatus();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({
      status: "started",
    });
  };

  if (!query.data) return null;

  const results = query.data.data as RoomGet;

  const currentUser = results.users.find(
    (user) => user.id === localStorage.getItem("userId")
  );

  if (!currentUser?.isRoomCreator || results.room.status !== "notStarted")
    return null;

  return (
    <form onSubmit={handleSubmit} className="absolute bottom-12 left-12">
      <Button disabled={mutation.isPending} variant={"secondary"}>
        Oyunu Başlat
      </Button>
    </form>
  );
}
