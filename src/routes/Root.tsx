import "@/index.css";
import { useEffect, useState } from "react";
import { FadeOutBox } from "@/components/fade-out-box";
import { WordsContainer } from "@/components/words-container";
import { CreateRoom } from "@/components/create-room";
import { RoomInfo } from "@/components/room-info";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RoomUsers } from "@/components/room-users";
import { JoinRoom } from "@/components/join-room";
import { GameInfo } from "@/components/game-info";
import { StartGame } from "@/components/start-game";
import { WordInput } from "@/components/word-input";
import { useParams } from "react-router-dom";
import { useWords } from "@/hooks";
import { LoaderCircleIcon, Menu } from "lucide-react";

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
      <Popover>
        <PopoverTrigger className="absolute text-white sm:hidden top-12 right-4">
          <Menu />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-y-4 sm:hidden">
          <CreateRoom />
          <JoinRoom />
          {/* <Link
            to="/scoreboard"
            className="text-sm text-center underline-offset-4 hover:underline"
          >
            Scoreboard
          </Link> */}
        </PopoverContent>
      </Popover>

      <div className="absolute items-start hidden gap-4 sm:flex sm:flex-col top-12 left-12 gap-x-6">
        <div>
          <CreateRoom />
          <JoinRoom />
        </div>
        {/* <Link
          to="/scoreboard"
          className="text-sm text-white underline-offset-4 hover:underline"
        >
          Scoreboard
        </Link> */}
      </div>
      <RoomInfo />

      <div className="flex flex-col items-center flex-1 w-full px-4 sm:px-0 md:w-2/3 justify-evenly">
        <div className="flex items-end justify-center h-64 sm:items-center">
          <GameInfo history={history} wordsList={wordsList} />
        </div>

        <div className="flex sm:w-[600px]  w-full flex-1 flex-col items-center justify-center ">
          <div className="flex w-full h-16 overflow-x-hidden ">
            <FadeOutBox direction="bg-gradient-to-r" />

            <WordsContainer history={history} wordsList={wordsList} />

            <FadeOutBox direction="bg-gradient-to-l" />
          </div>

          <WordInput
            history={history}
            setHistory={setHistory}
            wordsList={wordsList}
          />
        </div>

        <div className="flex items-start justify-center w-full h-64 ">
          <RoomUsers />
        </div>
      </div>

      <StartGame />
    </div>
  );
}
