import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";
import { socket } from "@/socket";
import { useNavigate } from "react-router-dom";

export function CreateRoom() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userName = formData.get("user-name");

    if (!userName) return;

    // Connect to websocket and send your userName
    socket.connect();
    socket.emit("createRoom", { userName: userName });

    // Navigate to roomId when room is created
    socket.on("createRoom", (roomId) => {
      navigate(`/${roomId}`);

      setOpen(false);
    });
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
