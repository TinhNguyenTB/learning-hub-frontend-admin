import App from "@/App";
import ErrorPage from "@/pages/ErrorPage";
import Login from "@/pages/Login";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: '/login',
    element: <Login />
  }
]);