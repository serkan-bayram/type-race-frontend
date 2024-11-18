import { useGetRoom } from "@/queries/queries";
import { RoomGet } from "@/types/api";
import { GameStatus } from "@/types/types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type GameContextType = {
  gameStatus: GameStatus;
  setGameStatus: Dispatch<SetStateAction<GameStatus>>;
};

const GameStatusContext = createContext<GameContextType | undefined>(undefined);

// TODO: This can be room provider
export const GameStatusProvider = ({ children }: { children: ReactNode }) => {
  const [gameStatus, setGameStatus] = useState<GameStatus>("notStarted");

  const roomQuery = useGetRoom();
  const roomStatus = (roomQuery.data?.data as RoomGet)?.room.status;

  useEffect(() => {
    if (roomStatus) {
      setGameStatus(roomStatus);
    }
  }, [roomStatus]);

  return (
    <GameStatusContext.Provider value={{ gameStatus, setGameStatus }}>
      {children}
    </GameStatusContext.Provider>
  );
};

export const useGameStatus = () => {
  const context = useContext(GameStatusContext);
  if (!context)
    throw new Error("Component must be used within GameStatusProvider");

  return context;
};
