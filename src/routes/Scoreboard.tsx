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
      <div className="flex flex-col w-1/4 gap-4 p-4 text-white rounded-lg bg-white/10">
        <div className="flex items-center justify-between gap-4 p-1 px-4 font-semibold text-white">
          <div>Username</div>
          <div>Score</div>
        </div>
        {scores.map((score) => (
          <div
            key={score.id}
            className="flex items-center justify-between gap-4 p-1 px-4 rounded-lg even:bg-black/10"
          >
            <div>{score.userName}</div>
            <div>{score.score}</div>
          </div>
        ))}
      </div>
      <Link to="/" className="text-white">
        Go back
      </Link>
    </div>
  );
}
