import { useCallback, useEffect, useState } from "react";
import { NavLinkProps } from "react-router-dom";
import { NavLink, Outlet, useLoaderData, useSubmit } from "react-router-dom";

export default function RootLayout() {
  const submit = useSubmit();
  const sessionTimeout = useLoaderData() as number | null;
  const [hasTimeout, setHasTimeout] = useState<boolean>(false);

  const handleLogout = useCallback(() => {
    submit(null, { method: "post", action: "/logout" });
  }, [submit]);

  useEffect(() => {
    if (!sessionTimeout || hasTimeout) {
      return;
    }

    setHasTimeout(true);

    setTimeout(() => {
      setHasTimeout(false);
      handleLogout();
    }, sessionTimeout * 1000 * 60);
  }, [handleLogout, sessionTimeout, hasTimeout]);

  return (
    <div className="sm:flex sm:gap-3">
      <header className="bg-white shadow-md sticky top-0 w-full sm:w-52 sm:h-screen sm:shrink-0">
        <a href="/" className="logo inline-block text-blue-800 text-6xl ml-3">
          LR
        </a>
        <input className="side-menu" type="checkbox" id="side-menu" />
        <label className="hamb" htmlFor="side-menu">
          <span className="hamb-line"></span>
        </label>
        <nav className="nav w-full h-full bg-white fixed overflow-hidden max-h-0 sm:w-52">
          <ul>
            <NavItem to="/users/">Users</NavItem>

            <NavItem to="/movies/">Movies</NavItem>

            <NavItem to="/members/">Members</NavItem>

            <li>
              <button
                className="block p-5 sm:w-52 w-full text-left hover:bg-blue-200"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="p-4 w-full">
        <Outlet />
      </main>
    </div>
  );
}

export const NavItem = (props: NavLinkProps) => {
  return (
    <li>
      <NavLink className="block p-5 sm:w-52 hover:bg-blue-200" {...props} />
    </li>
  );
};
