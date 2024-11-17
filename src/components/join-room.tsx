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

export function JoinRoom() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const roomId = formData.get("room-id");
    const userName = formData.get("user-name");
    // TODO: Write an api to let user join a room

    if (roomId) {
      navigate(`/${roomId}`);
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
          <Input required name="user-name" placeholder="Kullanıcı adı" />

          <Button>Devam Et</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
