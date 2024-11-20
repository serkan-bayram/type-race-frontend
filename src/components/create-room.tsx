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
import { Language } from "./language";

export function CreateRoom() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userName = formData.get("user-name");
    const language = formData.get("language");

    if (!userName || !language) return;

    localStorage.setItem("userName", userName.toString());
    localStorage.setItem("language", language.toString());

    // Connect to websocket and send your userName
    socket.disconnect();
    socket.connect();
    socket.emit("createRoom", { userName: userName, language: language });

    // Navigate to roomId when room is created
    socket.on("createRoom", (roomId) => {
      navigate(`/${roomId}`);

      setOpen(false);
    });
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Create Room</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="mb-2 font-custom-noto">
            Enter a username
          </DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            required
            className="font-custom-noto"
            name="user-name"
            defaultValue={localStorage.getItem("userName") || ""}
            placeholder="Username"
          />

          <div className="flex items-center justify-between text-sm font-custom-noto">
            Room Language:
            <Language />
          </div>

          <Button>Continue</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
