import { NavLink, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <>
      <header>
        <div>
          <ul>
            <li>
              <NavLink to="/users/">Users</NavLink>
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
