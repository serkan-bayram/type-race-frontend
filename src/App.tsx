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
      <div className="w-[900px] mb-24 h-[150px] flex flex-wrap overflow-y-hidden gap-5 border text-3xl font-custom-noto  font-semibold">
        {words.map((word, index) => {
          const letters = word.split("");

          return (
            <div className="text-black/30 flex" key={index}>
              {letters.map((letter, index) => (
                <div className={index === 0 ? "capitalize" : ""}>{letter}</div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
