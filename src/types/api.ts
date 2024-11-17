import { Game } from "@/routes/root";

// Return of /api/room/create
export type RoomCreate = {
  userId: string;
  roomId: string;
};

// Return of /api/room/:roomId
export type RoomGet = {
  room: {
    createdAt: string;
    id: string;
    updatedAt: string | null;
    status: Game;
  };
  users: { id: string; userName: string; isRoomCreator: boolean }[];
};
