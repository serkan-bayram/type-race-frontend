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
import { socket } from "@/socket";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

export function JoinRoom() {
  const navigate = useNavigate();

  const { roomId } = useParams();
  const [open, setOpen] = useState(!!roomId ? socket.disconnected : false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const roomId = formData.get("room-id");
    const userName = formData.get("user-name");

    if (!roomId || !userName) return;

    localStorage.setItem("userName", userName.toString());

    // Connect to websocket and send your userName
    socket.disconnect();
    socket.connect();
    socket.emit("joinRoom", { userName: userName, roomId: roomId });

    socket.on("joinRoom", (response) => {
      if (response !== "Success") {
        toast.error(response);
        return;
      }

      navigate(`/${roomId}`);
    });

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
          <Input
            required
            name="room-id"
            defaultValue={roomId}
            placeholder="Oda numarası"
          />
          <Input
            required
            name="user-name"
            defaultValue={localStorage.getItem("userName") || ""}
            placeholder="Kullanıcı adı"
          />

          <Button>Devam Et</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
