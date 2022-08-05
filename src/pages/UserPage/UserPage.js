import React from 'react';
import "./UserPage.scss";


class UserPage extends React.Component {




  render() {
    console.log(this.props.usersList);

    if (this.props.usersList.length) {

      const userId = this.props.routerProps.match.params.id;
      const users = this.props.usersList;


      const singleUser = users.filter((user) => userId === user.id);
      const { name } = singleUser[0];

      return (
        <>
    <h1 className='user__title'>Single User Page</h1>
    <p>{name}</p>
    </>
      )
    }
  }
}

export default UserPage;