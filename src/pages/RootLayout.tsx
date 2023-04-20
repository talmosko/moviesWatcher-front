import { useCallback, useEffect } from "react";
import { NavLink, Outlet, useSubmit } from "react-router-dom";
import { getSessionTimeout } from "../utils/auth";

export default function RootLayout() {
  const submit = useSubmit();
  const sessionTimeout = getSessionTimeout();

  const handleLogout = useCallback(() => {
    submit(null, { method: "post", action: "/logout" });
  }, [submit]);

  useEffect(() => {
    if (!sessionTimeout) {
      return;
    }

    setTimeout(() => {
      handleLogout();
    }, sessionTimeout * 1000 * 60);
  }, [handleLogout, sessionTimeout]);

  return (
    <>
      <header>
        <div>
          <ul>
            <li>
              <NavLink to="/users/">Users</NavLink>
              <NavLink to="/movies/">Movies</NavLink>
              <NavLink to="/members/">Members</NavLink>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}
