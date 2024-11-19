import "@/index.css";
import { useEffect, useState } from "react";
import { FadeOutBox } from "@/components/fade-out-box";
import { WordsContainer } from "@/components/words-container";
import { CreateRoom } from "@/components/create-room";
import { RoomInfo } from "@/components/room-info";
import { RoomUsers } from "@/components/room-users";
import { JoinRoom } from "@/components/join-room";
import { GameInfo } from "@/components/game-info";
import { StartGame } from "@/components/start-game";
import { WordInput } from "@/components/word-input";
import { useParams } from "react-router-dom";
import { useWords } from "@/hooks";
import { LoaderCircleIcon } from "lucide-react";

export default function Root() {
  const { data } = useWords();

  const wordsList = data?.data.words as string[];

  const [history, setHistory] = useState([""]);

  const { roomId } = useParams();

  useEffect(() => {
    setHistory([""]);
  }, [roomId]);

  if (!wordsList)
    return (
      <div className="w-full min-h-[100dvh] bg-[#0C0C0C] flex flex-col items-center justify-center">
        <LoaderCircleIcon className="w-12 h-12 animate-spin" color="white" />
      </div>
    );

  return (
    <div className="font-custom-noto w-full min-h-[100dvh] bg-[#0C0C0C] flex flex-col items-center justify-center">
      <div className="absolute flex items-center top-12 left-12 gap-x-6">
        <CreateRoom />
        <JoinRoom />
      </div>
      <RoomInfo />

      <GameInfo history={history} wordsList={wordsList} />

      <div className="flex w-[60%] h-16 overflow-x-hidden">
        <FadeOutBox direction="bg-gradient-to-r" />

        <WordsContainer history={history} wordsList={wordsList} />

        <FadeOutBox direction="bg-gradient-to-l" />
      </div>

      <WordInput
        history={history}
        setHistory={setHistory}
        wordsList={wordsList}
      />

      <StartGame />

      <RoomUsers />
    </div>
  );
}
