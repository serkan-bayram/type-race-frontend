import { socket } from "@/socket";
import copy from "copy-to-clipboard";
import { ClipboardIcon } from "lucide-react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export function RoomInfo() {
  const { roomId } = useParams();

  if (socket.disconnected) return null;

  if (!roomId) return null;

  const handleCopy = () => {
    copy(roomId);
    toast.success("Room number is copied");
  };

  return (
    <div className="absolute flex flex-col p-4 py-2 text-white shadow-xl gap-y-2 font-custom-noto rounded-xl bg-white/10 right-12 top-12 max-w-48">
      <div className="text-xs font-semibold">Room number</div>
      <button
        onClick={handleCopy}
        className="flex items-center max-w-full gap-x-2"
      >
        <div className="overflow-x-hidden text-sm whitespace-nowrap">
          {roomId}
        </div>
        <ClipboardIcon className="w-10" />
      </button>
    </div>
  );
}
