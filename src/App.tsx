import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Input } from "./components/ui/input";
import "./index.css";
import { cn } from "./lib/utils";

// "kalem",
// "dostluk",
// "sevgi",
// "deniz",
// "güneş",
// "ay",
// "yıldız",
// "çay",
// "kahve",
// "aile",
// "okul",
// "bahçe",
// "sokak",
// "şehir",
// "dağ",
// "ormam",
// "göl",
// "kuş",
// "göz",
// "mutluluk",
// "huzur",
// "rüya",
// "çocuk",
// "ev",
// "masa",
// "sandık",
// "zaman",

export default function App() {
  const wordsList = ["merhaba", "elma", "kitap"];

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

  return (
    <div className="w-full min-h-[100dvh] bg-background flex flex-col items-center justify-center">
      <div className="flex w-[40%] h-16 overflow-x-hidden">
        <div className="flex-1 z-10  h-full bg-gradient-to-r from-background from-30%"></div>

        <div className="w-[200px] flex items-center">
          {wordsList.map((word, wordIndex) => {
            const letters = word.split("");

            const wordInHistory = history[wordIndex]
              ? history[wordIndex]
              : undefined;

            const translateAmount = historyLastIndex * 200;

            return (
              <div
                key={wordIndex}
                style={{ translate: -translateAmount }}
                className={cn(
                  "flex-shrink-0 text-4xl transition-all  ease-in-out  w-[200px] flex justify-center"
                )}
              >
                {letters.map((letter, letterIndex) => {
                  let isTrue = false;
                  let isFalse = false;

                  if (wordInHistory) {
                    isTrue =
                      wordInHistory.charAt(letterIndex) ===
                      word.charAt(letterIndex);

                    // it can be false only if you passed that character
                    if (
                      wordInHistory.length > letterIndex &&
                      historyLastIndex >= wordIndex
                    ) {
                      isFalse =
                        wordInHistory?.charAt(letterIndex) !==
                        word.charAt(letterIndex);
                    }
                  }

                  return (
                    <div
                      key={letterIndex}
                      className={cn(
                        "font-semibold tracking-wide font-custom-noto",
                        {
                          "text-green-500": isTrue,
                          "text-red-500": isFalse,
                        }
                      )}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="flex-1 h-full z-10 bg-gradient-to-l from-background from-30%"></div>
      </div>

      <Input
        value={history[historyLastIndex]}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        placeholder="Press Space to move on"
        className="w-[280px] mt-16"
      />
    </div>
  );
}
