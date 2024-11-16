import { cn } from "@/lib/utils";

export function WordsContainer({
  wordsList,
  history,
}: {
  wordsList: string[];
  history: string[];
}) {
  const historyLastIndex = history.length - 1;

  return (
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
              "flex-shrink-0 text-4xl transition-all duration-500 ease-in-out  w-[200px] flex justify-center text-white/30 select-none"
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
                      "text-white": isTrue,
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
  );
}
