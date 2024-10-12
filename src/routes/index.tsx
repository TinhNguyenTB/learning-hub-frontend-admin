import App from "@/App";
import Categories from "@/pages/Categories";
import Courses from "@/pages/Courses";
import ErrorPage from "@/pages/ErrorPage";
import Levels from "@/pages/Levels";
import Login from "@/pages/Login";
import Subcategories from "@/pages/Subcategories";
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
        path: 'subcategories',
        element: <Subcategories />
      },
      {
        path: 'courses',
        element: <Courses />
      },
      {
        path: 'levels',
        element: <Levels />
      }
    ]
  },
  {
    path: '/login',
    element: <Login />
  }
]);