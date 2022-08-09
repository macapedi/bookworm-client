
import { NavLink, Link } from "react-router-dom";
import "./Header.scss";
import avatar from "../../assets/images/avatar.png";



function Header(props) {


  const logoutHandler = () => {
    props.handleLogout();
   
  };


  return (
    <header className="header">
      <div className="header__logo-avatar-wrapper">
        <NavLink to="/books" className="header__logo-link">
          <p className="header__logo"> BOOKWORM</p>
        </NavLink>
        <div className="avatar__container">
          <img className="avatar" src={avatar}></img>
          <Link to="/login"className="avatar__logout-link">Logout</Link>
        </div>
      </div>
      <nav className="header__nav-links">
        <NavLink
          to="/users/me"
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
        <div className="avatar-tablet__container">
          <img className="avatar-tablet" src={avatar}></img>
          <button className="avatar-tablet__logout-link" onClick={logoutHandler}>Logout</button>
        </div>

      </nav>
    </header>
  );
}
export default Header;
