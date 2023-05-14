import { useCallback, useEffect, useState } from "react";
import { Link, Outlet, json, useNavigate } from "react-router-dom";
import NavBar from "../components/UI/NavBar";
import axios, { AxiosError } from "axios";
import { useLogout } from "../hooks/use-logout";
import { getSessionTimeout } from "../utils/auth";
import { MainIcon } from "../components/UI/Icons";

export default function RootLayout() {
  const logout = useLogout();
  const navigate = useNavigate();
  const { sessionTimeout } = getSessionTimeout();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const isLoggedIn = !!timeoutId;

  const handleLogout = useCallback(async () => {
    const result = await logout();

    if (result && result.success) {
      setTimeoutId(null);
      navigate("/login");
    }
  }, [logout, navigate]);

  useEffect(() => {
    if (!sessionTimeout || timeoutId) {
      return;
    }

    setTimeoutId(
      setTimeout(() => {
        handleLogout();
      }, sessionTimeout * 1000 * 60)
    );
    return () => {
      timeoutId && clearTimeout(timeoutId);
    };
  }, [handleLogout, sessionTimeout, timeoutId]);

  return (
    <div className="sm:flex sm:gap-3">
      <header className="items-center bg-white shadow-md sticky top-0 w-full sm:w-52 sm:h-screen sm:shrink-0">
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
    <div className="inline-block pb-2">
      <Link to="/" className="flex text-2xl ml-4 sm:ml-10 mt-4 items-center">
        <span>
          <MainIcon className="mr-2 w-6 h-6" />
        </span>
        <span className="text-blue-800 font-bold">Ci</span>
        <span className="text-gray-500 font-semibold">nema</span>
      </Link>
    </div>
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
 