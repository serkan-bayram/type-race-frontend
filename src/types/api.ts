// Return of /api/room/create
export type RoomCreate = {
  userId: string;
  roomId: string;
};

// Return of /api/room/:roomId
export type RoomGet = {
  room: { createdAt: string; id: string; updatedAt: string | null };
  users: { id: string; userName: string }[];
};
