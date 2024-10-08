import App from "@/App";
import Categories from "@/pages/Categories";
import Courses from "@/pages/Courses";
import ErrorPage from "@/pages/ErrorPage";
import Login from "@/pages/Login";
import Users from "@/pages/Users";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'users',
        element: <Users />
      },
      {
        path: 'categories',
        element: <Categories />
      },
      {
        path: 'courses',
        element: <Courses />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]);