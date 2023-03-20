import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import UsersPage from "./pages/UsersPage";
import UserDetails, { userDetailsLoader } from "./pages/UserDetails";
import AddUser from "./pages/AddUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/users",
        children: [
          { index: true, element: <UsersPage /> },
          { path: ":id", loader: userDetailsLoader, element: <UserDetails /> },
          { path: "new", element: <AddUser /> },
        ],
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
