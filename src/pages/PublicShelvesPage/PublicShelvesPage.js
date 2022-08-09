import React from 'react';
import "./PublicShelvesPage.scss";
import { Link } from "react-router-dom"
import mainBadge from "../../assets/images/mainBadge.png";

class PublicShelvesPage extends React.Component {



  render() {

    if (this.props.usersList.length) {

      return (
        <>
          <h1 className='public-users__title'>BookWormers</h1>
          <ul className='public-users__container'>

            {this.props.usersList.map((user, index) => {


              return (


                <li key={user.id} className="public-users__link-container">
                  <Link to={`/users/${user.id}`} className='public-users__link-container'>
                    <div className='public-users__wrapper'>
                      <p className='public-users__name'> {user.name}</p>
                      <img src={mainBadge} alt="baby worm bage" className='badge'></img>
                    </div>

                  </Link>
                </li>
              )

            })}

          </ul>

        </>
      );
    } else {
      return <p>Loading...</p>
    }
  }
}

export default PublicShelvesPage;
