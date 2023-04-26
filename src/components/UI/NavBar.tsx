import { NavLinkProps } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  LoginIcon,
  LogoutIcon,
  MembersIcon,
  MoviesIcon,
  UsersIcon,
} from "../../components/UI/Icons";

const NavItem = ({
  onClick,
  ...props
}: NavLinkProps & { onClick: () => void }) => {
  return (
    <li className="w-44 ml-4 sm:ml-0 sm:place-self-center">
      <NavLink
        onClick={onClick}
        className={({ isActive }) =>
          `block p-4 pl-8 rounded-md flex items-center gap-4 ${
            isActive
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "bg-transparent text-gray-500 hover:bg-blue-100 font-semibold"
          }`
        }
        style={{
          transition:
            "background-color 400ms ease-in-out, color 400ms ease-in-out",
        }}
        {...props}
      />
    </li>
  );
};

const NavBar = ({
  setIsMenuOpen,
  handleLogout,
}: {
  handleLogout: () => void;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="nav w-full h-full bg-white fixed overflow-hidden max-h-0 sm:w-52">
      <ul className="flex flex-col gap-1 mt-4">
        <NavItem onClick={closeMenu} to="/users/">
          {({ isActive }) => (
            <>
              <UsersIcon isActive={isActive} />
              Users
            </>
          )}
        </NavItem>

        <NavItem onClick={closeMenu} to="/movies/">
          {({ isActive }) => (
            <>
              <MoviesIcon isActive={isActive} />
              Movies
            </>
          )}
        </NavItem>

        <NavItem onClick={closeMenu} to="/members/">
          {({ isActive }) => (
            <>
              <MembersIcon isActive={isActive} />
              Members
            </>
          )}
        </NavItem>

        <NavItem
          onClick={() => {
            closeMenu();
            handleLogout();
          }}
          to="/"
        >
          <LogoutIcon />
          Logout
        </NavItem>
      </ul>
    </nav>
  );
};

export default NavBar;
