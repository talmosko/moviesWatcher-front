import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import RootLayout, { logoutAction } from "./pages/RootLayout";
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
import {
  action as authAction,
  loader as authPageLoader,
} from "./pages/Auth/AuthPage";
import { authLoader, getSessionTimeout } from "./utils/auth";
import { AllPermissionsDict } from "./types/userTypes";
import UnauthorizedPage from "./pages/Auth/Unauthorized";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    loader: getSessionTimeout,
    action: logoutAction,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "login",
        element: <AuthPage isSignup={false} />,
        action: authAction,
        loader: authPageLoader,
      },
      {
        path: "signup",
        element: <AuthPage isSignup={true} />,
        action: authAction,
        loader: authPageLoader,
      },
      {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
      },
      {
        path: "/users",
        loader: authLoader(AllPermissionsDict.SiteAdmin),
        children: [
          { index: true, element: <UsersPage /> },
          {
            path: ":id",
            loader: userDetailsLoader,
            element: <UserDetails />,
          },
          {
            path: "new",
            element: <AddUser />,
          },
        ],
      },
      {
        path: "/movies",
        children: [
          {
            index: true,
            element: <MoviesPage />,
            loader: authLoader(AllPermissionsDict.ViewMovies),
          },
          {
            path: ":id",
            loader: authLoader(
              AllPermissionsDict.UpdateMovies,
              movieDetailsLoader
            ),
            element: <MovieDetails />,
          },
          {
            path: "new",
            element: <AddMovie />,
            loader: authLoader(AllPermissionsDict.CreateMovies),
          },
        ],
      },
      {
        path: "/members",
        children: [
          {
            index: true,
            element: <MembersPage />,
            loader: authLoader(AllPermissionsDict.ViewSubscriptions),
          },
          {
            path: ":id",
            loader: authLoader(
              AllPermissionsDict.UpdateSubscriptions,
              memberDetailsLoader
            ),
            element: <MemberDetails />,
          },
          {
            path: "new",
            element: <AddMember />,
            loader: authLoader(AllPermissionsDict.CreateSubscriptions),
          },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
   