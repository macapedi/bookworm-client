import React from 'react';
import "./UserPage.scss";
import axios from "axios"
import {Link} from "react-router-dom";


class UserPage extends React.Component {

  state = {
    userBookList: []
  }


  async componentDidMount() {

    const userId = this.props.routerProps.match.params.id;
    const userBookListReq = await axios.get(`http://localhost:8080/users/${userId}`);

    const userBookList = userBookListReq.data.inventoryBooks;
   
    this.setState({
      userBookList
    })

  }

  async componentDidUpdate() {

    const userId = this.props.routerProps.match.params.id;
    const userBookListReq = await axios.get(`http://localhost:8080/users/${userId}`);

    const userBookList = userBookListReq.data.inventoryBooks;
   
    this.setState({
      userBookList
    })

  }

  render() {


    if (this.props.usersList && this.state.userBookList) {

      const userId = this.props.routerProps.match.params.id;
      const users = this.props.usersList;


      const singleUser = users.filter((user) => userId === user.id);
      const { name } = singleUser[0];

      return (
        <>
          <h1 className='user__title'>Single User Page</h1>
          <p>{name}</p>

          <ul className='books__image-container'>
       

            {this.state.userBookList.map((book, index) => {


              return (


                <li key={book.primary_isbn10} className="books__container">
                  <Link to={`/users/${userId}/${book.primary_isbn10}`} className='books__container'>

                    <div className='books__wrapper'>
                      {/* <p className='books__rank'> {book.rank}</p> */}
                      <img className='books__image' src={book.book_image}></img>
                    </div>

                  </Link>
                </li>
              )

            })}

          </ul>





        </>
      )
    }
  }
}

export default UserPage;