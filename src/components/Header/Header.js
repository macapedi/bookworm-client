
import { NavLink, Link, withRouter } from "react-router-dom";
import React from "react";
import "./Header.scss";
import avatar from "../../assets/images/avatar.png";
import jwt_decode from "jwt-decode";


class Header extends React.Component {


  state = {
    isLogedIn: false,
    currentUserId: null,
    isActiveMyShelve: false,
    isActivePublicShelve: false,
  }


  handleLogout = () => {
    sessionStorage.removeItem('token');
    console.log("token removed");
    this.props.history.push("/login");
  };

  goToBooks = () => {

    this.setState({
      isActivePublicShelve: false,
      isActiveMyShelve: false
    })
    this.props.history.push(`/books`)
  }

  goToPublicShelves = () => {
    this.setState({
      isActivePublicShelve: true,
      isActiveMyShelve: false
    })
    this.props.history.push(`/users`)
  }

  getCurrentUserId = () => {
    let currentUserId;
    let tokenDecoded;

    if (jwt_decode(sessionStorage.getItem('token'))) {

      tokenDecoded = jwt_decode(sessionStorage.getItem('token'));
      currentUserId = tokenDecoded.id;
      this.setState({
        currentUserId: currentUserId,
        isActiveMyShelve: true,
        isActivePublicShelve: false

      })
    }
    this.props.history.push(`/users/${currentUserId}`)
  }



  render() {


    // const currentUserId = 8; // 

    // 
    return (
      <header className="header">
        <div className="header__logo-avatar-wrapper">
          <Link onClick={this.goToBooks} className="header__logo-link">
            <p className="header__logo"> BOOKWORM</p>
          </Link>
          <div className="avatar__container">
            <img className="avatar" src={avatar}></img>
            <Link onClick={this.handleLogout} className="avatar__logout-link">Logout</Link>
          </div>
        </div>
        <nav className="header__nav-links">
          <Link
            onClick={this.getCurrentUserId}
            className={"header__nav-link header__nav-link" +
              (this.state.isActiveMyShelve ? "--selected" : "")
            }
          >
            <span className="header__nav-link-text">My Shelves</span>
          </Link>
          <Link
            onClick={this.goToPublicShelves}
            className={"header__nav-link header__nav-link" +
              (this.state.isActivePublicShelve ? "--selected" : "")
            }
          >
            <span className="header__nav-link-text">Public Shelves</span>
          </Link>
          <div className="avatar-tablet__container">
            <img className="avatar-tablet" src={avatar}></img>
            <Link onClick={this.handleLogout} className="avatar-tablet__logout-link">Logout</Link>
          </div>

        </nav>
      </header>
    );


  }
}
export default withRouter(Header);
