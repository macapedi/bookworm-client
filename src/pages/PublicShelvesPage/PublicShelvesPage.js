import React from 'react';
import "./PublicShelvesPage.scss";
import {Link} from "react-router-dom"

class PublicShelvesPage extends React.Component {



render () {

  if (this.props.usersList.length) {

    return (
      <>
        <h1 className='books__title'>Users Page</h1>
        <ul className='books__image-container'>

          {this.props.usersList.map((user, index) => {


            return (


              <li key={user.id} className="users__container">
                <Link to={`/users/${user.id}`} className='users__container'>

                  <div className='users__wrapper'>
                  <p className='users'> {user.name}</p>

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
  