import { useRoomSocket } from "@/hooks";

export function RoomUsers() {
  const { room } = useRoomSocket();

  if (!room) return null;

  return (
    <div className="absolute flex flex-col items-center justify-center gap-8 bottom-32 font-custom-noto max-w-[70%]">
      <div className="text-xl font-bold text-white">Oyuncular</div>
      <div className="flex max-w-full gap-12 pb-4 overflow-x-auto">
        {room?.users.map((user) => (
          <div
            key={user.id}
            className="flex flex-col flex-shrink-0 h-24 p-3 overflow-x-hidden text-white shadow-xl min-w-24 rounded-xl bg-white/10 "
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
