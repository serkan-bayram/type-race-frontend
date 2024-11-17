import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import axios from "axios";

export const createRoom = async () => {
  return axios.get(`${import.meta.env.VITE_API_URL}/room/create`);
};

export function CreateRoom() {
  const mutation = useMutation({
    mutationKey: ["create-room"],
    mutationFn: createRoom,
  });

  return (
    <Button
      onClick={() => mutation.mutate()}
      variant={"secondary"}
      className="absolute top-12 left-12"
    >
      Oda Oluştur
    </Button>
  );
}
