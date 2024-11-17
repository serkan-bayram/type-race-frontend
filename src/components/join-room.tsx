import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const joinRoom = ({
  roomId,
  userName,
}: {
  roomId: string;
  userName: string;
}) => {
  return axios.post(`${import.meta.env.VITE_API_URL}/room/join`, {
    roomId: roomId,
    userName: userName,
  });
};

export function JoinRoom() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const mutation = useMutation({
    onSuccess: (_, { roomId }) => {
      navigate(`/${roomId}`);
      setOpen(false);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      }
    },
    mutationKey: ["join-room"],
    mutationFn: joinRoom,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const roomId = formData.get("room-id");
    const userName = formData.get("user-name");

    if (roomId && userName) {
      mutation.mutate({
        roomId: roomId.toString(),
        userName: userName.toString(),
      });
      return;
    }

    toast.error("Bir şeyler ters gitti");
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="text-white" variant={"link"}>
          Bir Odaya Katıl
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="mb-2">Bir oda numarası gir</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input required name="room-id" placeholder="Oda numarası" />
          <Input
            required
            name="user-name"
            value={localStorage.getItem("userName") || ""}
            placeholder="Kullanıcı adı"
          />

          <Button disabled={mutation.isPending}>Devam Et</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
