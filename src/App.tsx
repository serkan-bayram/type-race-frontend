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
    <div className="w-full min-h-[100dvh] bg-background flex items-center justify-center">
      <div className="flex w-[40%] h-16  overflow-x-hidden">
        <div className="flex-1 h-full bg-gradient-to-r from-background from-30%"></div>
        <div className="w-[200px] flex items-center">
          {words.map((word) => (
            <div className="flex-shrink-0 text-4xl capitalize w-[200px] text-center">
              {word}
            </div>
          ))}
        </div>
        <div className="flex-1 h-full bg-gradient-to-l from-background from-30%"></div>
      </div>
    </div>
  );
}
