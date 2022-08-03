
import {  NavLink } from "react-router-dom";
import "./Header.scss";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogOutButton/LogOutButton";


function Header() {
  return (
        <header className="header">
          <NavLink to="/books">
            <p className="header__logo"> BOOKWORM</p>
          </NavLink>
          <nav className="header__nav-links">
            <NavLink
              to="/users/:id"
              className={(isActive) =>
                "header__nav-link header__nav-link" +
                (isActive ? "--selected" : "")
              }
            >
              My shelves
            </NavLink>
            <NavLink
              to="/users"
              className={(isActive) =>
                "header__nav-link header__nav-link" +
                (isActive ? "--selected" : "")
              }
            >
              Public Shelves
            </NavLink>
            <LoginButton/>
            <LogoutButton/>
          </nav>
        </header>
  );
}
export default Header;
