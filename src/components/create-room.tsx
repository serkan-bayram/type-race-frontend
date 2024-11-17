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
import { useCreateRoom } from "@/queries/queries";

export function CreateRoom() {
  const [open, setOpen] = useState(false);

  const mutation = useCreateRoom();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userName = formData.get("user-name");

    if (!userName) return;

    mutation.mutate({ userName: userName.toString() });

    setOpen(false);
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

          <Button disabled={mutation.isPending}>Devam Et</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}