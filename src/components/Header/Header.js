
import {  NavLink } from "react-router-dom";
import "./Header.scss";



function Header() {


 const handleLogout = () => {
  
    this.setState({
      user: null,
      failedAuth: true,
    });
  };


  return (
        <header className="header">
          <NavLink to="/books" className="header__logo-link">
            <p className="header__logo"> BOOKWORM</p>
          </NavLink>
          <nav className="header__nav-links">
            <NavLink
              to="/users/2922c286-16cd-4d43-ab98-c79f698aeab0"
              className={(isActive) =>
                "header__nav-link header__nav-link" +
                (isActive ? "--selected" : "")
              }
            >
              <span className="header__nav-link-text">My Shelves</span>
            </NavLink>
            <NavLink
              to="/users"
              className={(isActive) =>
                "header__nav-link header__nav-link" +
                (isActive ? "--selected" : "")
              }
            >
              <span className="header__nav-link-text">Public Shelves</span>
            </NavLink>
          
          </nav>
        </header>
  );
}
export default Header;
