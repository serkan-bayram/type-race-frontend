import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.tsx";
import { Toaster } from "sonner";
import Scoreboard from "./routes/Scoreboard.tsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/:roomId?",
    element: (
      <>
        <Toaster />
        <Root />
      </>
    ),
  },
  {
    path: "/scoreboard",
    element: (
      <>
        <Toaster />
        <Scoreboard />
      </>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </StrictMode>
);
