import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import axios from "axios";
import { RoomCreate } from "@/types/api";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

export const createRoom = async ({ userName }: { userName: string }) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/room/create`, {
    userName: userName,
  });
};

export function CreateRoom() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    },
    onSuccess: async (data, { userName }) => {
      const { roomId, userId } = data.data as RoomCreate;

      navigate(`/${roomId}`);

      // I don't think this works
      await queryClient.invalidateQueries({
        queryKey: ["get-room"],
      });

      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);

      setOpen(false);
    },
    mutationKey: ["create-room"],
    mutationFn: createRoom,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const userName = formData.get("user-name");

    if (!userName) return;

    mutation.mutate({ userName: userName.toString() });
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Oda Oluştur</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="mb-2">Bir kullanıcı adı gir</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input required name="user-name" placeholder="Kullanıcı adı" />

          <Button disabled={mutation.isPending}>Devam Et</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
