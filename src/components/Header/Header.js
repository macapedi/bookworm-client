
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
          <NavLink to="/books">
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
          
          </nav>
        </header>
  );
}
export default Header;
