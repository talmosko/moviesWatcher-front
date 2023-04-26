import { useCallback, useEffect, useState } from "react";
import {
  Outlet,
  json,
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";
import NavBar from "../components/UI/NavBar";
import axios, { AxiosError } from "axios";
import { useLogout } from "../hooks/use-logout";
import { getSessionTimeout } from "../utils/auth";

export default function RootLayout() {
  const logout = useLogout();
  const navigate = useNavigate();
  // const submit = useSubmit();
  // const data = useActionData();
  // console.log(data);
  // const sessionTimeout = useLoaderData() as number | null;
  const sessionTimeout = getSessionTimeout();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleLogout = useCallback(async () => {
    const result = await logout();

    if (result && result.success) {
      setIsLoggedIn(false);
      navigate("/login");
    }
  }, [logout, navigate]);

  // const handleLogout = useCallback(async () => {
  //   submit({}, { method: "post", replace: true });
  // }, [submit]);

  useEffect(() => {
    if (!sessionTimeout) {
      return;
    }

    setIsLoggedIn(true);

    const timeoutId = setTimeout(() => {
      setIsLoggedIn(false);
      handleLogout();
    }, sessionTimeout * 1000 * 60);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [handleLogout, sessionTimeout]);

  return (
    <div className="sm:flex sm:gap-3">
      <header className="bg-white shadow-md sticky top-0 w-full sm:w-52 sm:h-screen sm:shrink-0">
        <MainLogo />
        <HamburgerIcon isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <NavBar
          handleLogout={handleLogout}
          setIsMenuOpen={setIsMenuOpen}
          isLoggedIn={isLoggedIn}
        />
      </header>

      <main className="p-4 w-full">
        <Outlet />
      </main>
    </div>
  );
}

const HamburgerIcon = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <input
        className="side-menu"
        type="checkbox"
        id="side-menu"
        checked={isMenuOpen}
        onChange={() => setIsMenuOpen((prev) => !prev)}
      />
      <label className="hamb" htmlFor="side-menu">
        <span className="hamb-line"></span>
      </label>
    </>
  );
};

const MainLogo = () => {
  return (
    <a href="/" className="logo inline-block text-blue-800 text-6xl ml-3">
      LR
    </a>
  );
};

export async function logoutAction() {
  try {
    await axios.post(
      `${import.meta.env.VITE_CINEMA_API}/logout`,
      {},
      {
        withCredentials: true,
      }
    );

    localStorage.removeItem("permissions");
    localStorage.removeItem("sessionTimeout");
    return json({ success: true });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response) {
        throw json(error.response.data.message, { status: 500 });
      }
    } else {
      throw json("Failed to logout", { status: 500 });
    }
  }
  return json({ success: false });
}
