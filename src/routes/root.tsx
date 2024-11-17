import { ChangeEvent, KeyboardEvent, useState } from "react";
import "@/index.css";
import { Input } from "@/components/ui/input";
import { FadeOutBox } from "@/components/fade-out-box";
import { WordsContainer } from "@/components/words-container";
import { CreateRoom } from "@/components/create-room";
import { RoomInfo } from "@/components/room-info";
import { useParams } from "react-router-dom";
import { RoomUsers } from "@/components/room-users";
import { JoinRoom } from "@/components/join-room";

export default function Root() {
  const wordsList = [
    "merhaba",
    "elma",
    "kitap",
    "kalem",
    "dostluk",
    "sevgi",
    "deniz",
    "güneş",
    "ay",
    "yıldız",
    "çay",
    "kahve",
    "aile",
    "okul",
    "bahçe",
    "sokak",
    "şehir",
    "dağ",
    "ormam",
    "göl",
    "kuş",
    "göz",
    "mutluluk",
    "huzur",
    "rüya",
    "çocuk",
    "ev",
    "masa",
    "sandık",
    "zaman",
  ];

  const [history, setHistory] = useState([""]);
  const historyLastIndex = history.length - 1;

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (history[historyLastIndex].length === 0 && history.length > 1) {
        setHistory((history) => {
          const historyCopy = [...history];

          historyCopy.pop();

          return historyCopy;
        });
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newInput = e.target.value;

    // If Space is pressed
    if (
      newInput.charAt(newInput.length - 1) === " " &&
      history.length < wordsList.length
    ) {
      setHistory((history) => {
        const historyCopy = [...history];

        historyCopy.push("");

        return historyCopy;
      });

      return;
    }

    setHistory((history) => {
      const historyCopy = [...history];

      historyCopy[historyLastIndex] = newInput;

      return historyCopy;
    });
  };

  const { roomId } = useParams();

  return (
    <div className="w-full min-h-[100dvh] bg-[#0C0C0C] flex flex-col items-center justify-center pt-36">
      <div className="absolute flex items-center top-12 left-12 gap-x-6">
        <CreateRoom />
        <JoinRoom />
      </div>
      {roomId && <RoomInfo />}

      <div className="flex w-[40%] h-16 overflow-x-hidden">
        <FadeOutBox direction="bg-gradient-to-r" />

        <WordsContainer history={history} wordsList={wordsList} />

        <FadeOutBox direction="bg-gradient-to-l" />
      </div>

      <Input
        value={history[historyLastIndex]}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder="Yazmaya başla"
        className="w-[500px] text-lg py-6 mt-12 rounded-xl text-white placeholder:text-white bg-white/10 shadow-xl border-none"
      />

      <RoomUsers />
    </div>
  );
}
