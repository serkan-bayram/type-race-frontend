import { useRoomSocket } from "@/hooks";

export function RoomUsers() {
  const { room } = useRoomSocket();

  if (!room) return null;

  return (
    <div className="absolute flex flex-col items-center justify-center gap-8 bottom-32 font-custom-noto">
      <div className="text-xl font-bold text-white">Oyuncular</div>
      <div className="flex gap-12">
        {room?.users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col h-24 p-3 text-white shadow-xl min-w-24 rounded-xl bg-white/10"
          >
            <div className="">{user.userName}</div>
            <div className="flex items-center justify-center flex-1 text-xl text-white ">
              24
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
