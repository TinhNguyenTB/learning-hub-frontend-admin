import App from "@/App";
import Categories from "@/pages/Categories";
import Courses from "@/pages/Courses";
import ErrorPage from "@/pages/ErrorPage";
import Levels from "@/pages/Levels";
import Login from "@/pages/Login";
import Subcategories from "@/pages/Subcategories";
import Users from "@/pages/Users";
import { PATH } from "@/utils/constants";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: PATH.HOME,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATH.USERS,
        element: <Users />
      },
      {
        path: PATH.CATEGORIES,
        element: <Categories />
      },
      {
        path: PATH.SUBCATEGORIES,
        element: <Subcategories />
      },
      {
        path: PATH.COURSES,
        element: <Courses />
      },
      {
        path: PATH.LEVELS,
        element: <Levels />
      }
    ]
  },
  {
    path: PATH.LOGIN,
    element: <Login />
  }
]);