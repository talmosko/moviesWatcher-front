import { useCallback, useEffect, useState } from "react";
import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import NavBar from "../components/UI/NavBar";

export default function RootLayout() {
  const submit = useSubmit();
  const sessionTimeout = useLoaderData() as number | null;
  const [hasTimeout, setHasTimeout] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const handleLogout = useCallback(() => {
    submit(null, { method: "post", action: "/logout" });
  }, [submit]);

  useEffect(() => {
    if (!sessionTimeout || hasTimeout) {
      return;
    }
    setHasTimeout(true);

    const timeoutId = setTimeout(() => {
      setHasTimeout(false);
      handleLogout();
    }, sessionTimeout * 1000 * 60);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [handleLogout, sessionTimeout, hasTimeout]);

  return (
    <div className="sm:flex sm:gap-3">
      <header className="bg-white shadow-md sticky top-0 w-full sm:w-52 sm:h-screen sm:shrink-0">
        <MainLogo />
        <HamburgerIcon isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        <NavBar handleLogout={handleLogout} setIsMenuOpen={setIsMenuOpen} />
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
