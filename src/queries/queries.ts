import { RoomCreate } from "@/types/api";
import { GameStatus } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export function useJoinRoom() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    onSuccess: (_, { roomId }) => {
      navigate(`/${roomId}`);
      queryClient.invalidateQueries({ queryKey: ["get-room", roomId] });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    },
    mutationKey: ["join-room"],
    mutationFn: ({ roomId, userName }: { roomId: string; userName: string }) =>
      axios.post("/room/join", {
        roomId: roomId,
        userName: userName,
      }),
  });
}

export function useCreateRoom() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.error);
      }
    },
    onSuccess: async (data, { userName }) => {
      const { roomId, userId } = data.data as RoomCreate;

      navigate(`/${roomId}`);

      await queryClient.invalidateQueries({
        queryKey: ["get-room", roomId],
      });

      localStorage.setItem("userName", userName);
      localStorage.setItem("userId", userId);
    },
    mutationKey: ["create-room"],
    mutationFn: ({ userName }: { userName: string }) =>
      axios.post("/room/create", {
        userName: userName,
      }),
  });
}

export function useUpdateRoomStatus() {
  const queryClient = useQueryClient();

  const { roomId } = useParams();
  const userId = localStorage.getItem("userId") || "";

  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-room", roomId] });
    },
    mutationKey: ["update-room-status"],
    mutationFn: ({ status }: { status: GameStatus }) =>
      axios.post(`${import.meta.env.VITE_API_URL}/room/update-status`, {
        userId: userId,
        roomId: roomId,
        status: status,
      }),
  });
}

export function useGetRoom() {
  const { roomId } = useParams();

  return useQuery({
    queryKey: ["get-room", roomId],
    queryFn: () => axios.get(`/room/${roomId}`),
  });
}
