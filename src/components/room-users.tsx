import { useGetRoom } from "@/queries/queries";
import { RoomGet } from "@/types/api";

export function RoomUsers() {
  const { data } = useGetRoom();

  if (!data) return <div></div>;

  const results = data.data as RoomGet;

  return (
    <div className="absolute flex flex-col items-center justify-center gap-8 bottom-32 font-custom-noto">
      <div className="text-xl font-bold text-white">Oyuncular</div>
      <div className="flex gap-12">
        {results.users.map((result) => (
          <div
            key={result.id}
            className="flex flex-col h-24 p-3 text-white shadow-xl min-w-24 rounded-xl bg-white/10"
          >
            <div className="">{result.userName}</div>
            <div className="flex items-center justify-center flex-1 text-xl text-white ">
              24
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
