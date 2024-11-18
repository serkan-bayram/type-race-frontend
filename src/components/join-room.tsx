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
import { useJoinRoom } from "@/queries/queries";
import { socket } from "@/socket";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function JoinRoom() {
  const [open, setOpen] = useState(false);

  const mutation = useJoinRoom();

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const roomId = formData.get("room-id");
    const userName = formData.get("user-name");

    if (!roomId || !userName) return;

    // Connect to websocket and send your userName
    socket.connect();
    socket.emit("joinRoom", { userName: userName, roomId: roomId });

    socket.on("joinRoom", (response) => {
      if (response !== "Success") {
        toast.error(response);
        return;
      }

      navigate(`/${roomId}`);
    });

    // // Navigate to roomId when room is created
    // socket.on("roomCreated", (roomId) => {
    //   navigate(`/${roomId}`);

    //   setOpen(false);
    // });

    // mutation.mutate({
    //   roomId: roomId.toString(),
    //   userName: userName.toString(),
    // });

    setOpen(false);
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
            defaultValue={localStorage.getItem("userName") || ""}
            placeholder="Kullanıcı adı"
          />

          <Button disabled={mutation.isPending}>Devam Et</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
