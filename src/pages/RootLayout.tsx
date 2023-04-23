import { useCallback, useEffect, useState } from "react";
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
