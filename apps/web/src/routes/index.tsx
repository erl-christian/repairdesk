import { PublicLayout } from "@/layouts/PublicLayout";
import { Homepage } from "@/pages/Homepage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
    ],
  },
]);
