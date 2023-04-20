import "./index.css";
import "./App.css";
import {
  ActionFunction,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import UsersPage from "./pages/User/UsersPage";
import UserDetails, { userDetailsLoader } from "./pages/User/UserDetails";
import AddUser from "./pages/User/AddUser";
import MoviesPage from "./pages/Movie/MoviesPage";
import MovieDetails, { movieDetailsLoader } from "./pages/Movie/MovieDetails";
import AddMovie from "./pages/Movie/AddMovie";
import MembersPage from "./pages/Member/MembersPage";
import MemberDetails, {
  memberDetailsLoader,
} from "./pages/Member/MemberDetails";
import AddMember from "./pages/Member/AddMember";
import AuthPage from "./pages/Auth/AuthPage";
import Logout, { logoutAction } from "./pages/Auth/Logout";
import { action as authAction } from "./pages/Auth/AuthPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      { path: "logout", element: <Logout />, action: logoutAction },
      {
        path: "login",
        element: <AuthPage isSignup={false} />,
        action: authAction,
      },
      {
        path: "signup",
        element: <AuthPage isSignup={true} />,
        action: authAction,
      },

      {
        path: "/users",
        children: [
          { index: true, element: <UsersPage /> },
          { path: ":id", loader: userDetailsLoader, element: <UserDetails /> },
          { path: "new", element: <AddUser /> },
        ],
      },
      {
        path: "/movies",
        children: [
          { index: true, element: <MoviesPage /> },
          {
            path: ":id",
            loader: movieDetailsLoader,
            element: <MovieDetails />,
          },
          { path: "new", element: <AddMovie /> },
        ],
      },
      {
        path: "/members",
        children: [
          { index: true, element: <MembersPage /> },
          {
            path: ":id",
            loader: memberDetailsLoader,
            element: <MemberDetails />,
          },
          { path: "new", element: <AddMember /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
