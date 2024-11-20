import { useRoomSocket } from "@/hooks";
import { cn } from "@/lib/utils";
import { socket } from "@/socket";

export function RoomUsers() {
  const { room } = useRoomSocket();

  if (!room) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-8 font-custom-noto max-w-[70%]">
      <div className="text-xl font-bold text-white">Players</div>
      <div className="flex max-w-full overflow-x-auto gap-x-12">
        {room?.users.map((user) => (
          <div
            key={user.id}
            className={cn(
              "flex flex-col flex-shrink-0 h-24 p-3 overflow-x-hidden text-white shadow-xl min-w-24 rounded-xl bg-white/10",
              { "border border-purple-700": user.id === socket.id }
            )}
          >
            <div className="">{user.userName.slice(0, 15)}</div>
            <div className="flex items-center justify-center flex-1 text-xl text-white ">
              {user.WPM}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
