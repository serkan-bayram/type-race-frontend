import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";

type Score = {
  id: number;
  userName: string;
  score: number;
  createdAt: string;
};

export default function Scoreboard() {
  const query = useQuery({
    queryKey: ["scoreboard"],
    queryFn: () => axios.get("/score/all"),
  });

  if (!query.data?.data) return;

  const scores = query.data?.data.scores as Score[];

  return (
    <div className="font-custom-noto py-24 w-full min-h-[100dvh] bg-[#0C0C0C] flex flex-col items-center justify-center gap-8">
      <h1 className="text-lg font-semibold text-white">Scoreboard</h1>
      <div className="flex flex-col w-full gap-4 p-4 text-white rounded-lg sm:w-2/3 bg-white/10">
        <div className="flex items-center justify-between gap-4 p-1 px-4 font-semibold text-white">
          <div className="flex-1">Username</div>
          <div className="flex-1">Score</div>
          <div className="flex-1">Date</div>
        </div>
        {scores.map((score) => (
          <div
            key={score.id}
            className="flex items-center justify-between gap-4 p-1 px-4 rounded-lg even:bg-black/10"
          >
            <div className="flex-1">{score.userName}</div>
            <div className="flex-1">{score.score} WPM</div>
            <div className="flex-1">
              {new Date(score.createdAt).toLocaleDateString(undefined, {
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
          </div>
        ))}
      </div>
      <Link to="/" className="text-white">
        Go back
      </Link>
    </div>
  );
}
