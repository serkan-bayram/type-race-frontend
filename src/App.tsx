import { Input } from "./components/ui/input";
import "./index.css";

export default function App() {
  const words = [
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

  return (
    <div className="w-full min-h-[100dvh] bg-background flex flex-col items-center justify-center">
      <div className="flex w-[40%] h-16 overflow-x-hidden">
        <div className="flex-1 h-full bg-gradient-to-r from-background from-30%"></div>

        <div className="w-[200px] flex items-center border-black border">
          {words.map((word) => {
            const letters = word.split("");

            return (
              <div className="flex-shrink-0 text-4xl  w-[200px] flex justify-center">
                {letters.map((letter) => (
                  <div className="font-semibold tracking-wide first:capitalize font-custom-noto">
                    {letter}
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        <div className="flex-1 h-full bg-gradient-to-l from-background from-30%"></div>
      </div>

      <Input placeholder="Press Space to move on" className="w-[280px] mt-16" />
    </div>
  );
}
