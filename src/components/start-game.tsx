import { Game } from "@/routes/root";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoom } from "./room-users";
import { useParams } from "react-router-dom";
import { RoomGet } from "@/types/api";
import axios from "axios";
import { toast } from "sonner";

export const updateRoomStatus = async ({
  userId,
  roomId,
  status,
}: {
  userId: string;
  roomId: string;
  status: Game;
}) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/room/update-status`, {
    userId: userId,
    roomId: roomId,
    status: status,
  });
};

export function StartGame({
  setGame,
}: {
  setGame: Dispatch<SetStateAction<Game>>;
}) {
  const { roomId } = useParams();

  const query = useQuery({
    queryKey: ["get-room", roomId],
    queryFn: () => getRoom({ roomId: roomId || "" }),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["get-room", roomId] });
      toast.success("Oyun başladı!");
      setGame("started");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    },
    mutationKey: ["start-game"],
    mutationFn: updateRoomStatus,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate({
      roomId: roomId || "",
      userId: localStorage.getItem("userId") || "",
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
