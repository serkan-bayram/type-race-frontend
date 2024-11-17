import { RoomGet } from "@/types/api";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const getRoom = async ({ roomId }: { roomId: string }) => {
  return axios.get(`${import.meta.env.VITE_API_URL}/room/${roomId}`);
};

export function RoomUsers() {
  const { roomId } = useParams();

  const query = useQuery({
    queryKey: ["get-room", roomId],
    queryFn: () => getRoom({ roomId: roomId || "" }),
  });

  const results = query.data?.data as RoomGet | undefined;

  if (!results) return <div></div>;

  return (
    <div className="flex flex-col items-center justify-center gap-8 mt-20 font-custom-noto">
      <div className="text-xl font-bold text-white">Oyuncular</div>
      <div className="flex gap-12">
        {results.users.map((result) => (
          <div className="flex flex-col h-24 p-3 text-white shadow-xl min-w-24 rounded-xl bg-white/10">
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
