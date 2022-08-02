
import {  NavLink } from "react-router-dom";
import "./Header.scss";


function Header() {
  return (
        <header className="header">
          <NavLink to="/home">
            <p className="header__logo"> BOOKWORM</p>
          </NavLink>
          <nav className="header__nav-links">
            <NavLink
              to="/user/:id"
              className={(isActive) =>
                "header__nav-link header__nav-link" +
                (isActive ? "--selected" : "")
              }
            >
              My shelves
            </NavLink>
            <NavLink
              to="/public-shelves"
              className={(isActive) =>
                "header__nav-link header__nav-link" +
                (isActive ? "--selected" : "")
              }
            >
              Public Shelves
            </NavLink>
          </nav>
        </header>
  );
}
export default Header;
