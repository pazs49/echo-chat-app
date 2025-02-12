import { createBrowserRouter, RouterProvider } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Login";
import Error404 from "../pages/Error404";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/:type/:id",
        element: (
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        ),
      },
    ],
    errorElement: <Error404 />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
