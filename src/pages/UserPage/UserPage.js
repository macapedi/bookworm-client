import React from 'react';
import "./UserPage.scss";
import axios from "axios"
import { Link } from "react-router-dom";
import megaWorm from "../../assets/images/megaWorm.png";
import superWorm from "../../assets/images/superWorm.png";
import babyWorm from "../../assets/images/babyWorm.png"


class UserPage extends React.Component {

  state = {
    userBookList: [],
    readingList: [],
    wishList: [],
    readList: [],
    droppedList: [],
    currentUser: null
  }


  async componentDidMount() {

    const userId = this.props.routerProps.match.params.id;
    const userBookListReq = await axios.get(`http://localhost:8080/users/${userId}`);

    const userBookList = userBookListReq.data.inventoryBooks;
    console.log(userBookList);

    const finishedList = userBookList.filter((book) => book.status === "Finished");
    const wishList = userBookList.filter((book) => book.status === "Wish List");
    const readingList = userBookList.filter((book) => book.status === "Reading");
    const droppedList = userBookList.filter((book) => book.status === "Dropped");

    console.log(finishedList);


    this.setState({
      userBookList,
      finishedList,
      wishList,
      readingList,
      droppedList,
      currentUser: userId

    })

  }

  async componentDidUpdate(_prevProps, prevState) {



    const userId = this.props.routerProps.match.params.id;

    console.log("this is user id", userId);
    console.log("this is prevState", prevState);


    if (userId !== prevState.currentUser) {
      const userBookListReq = await axios.get(`http://localhost:8080/users/${userId}`);

      const userBookList = userBookListReq.data.inventoryBooks;
      console.log(userBookList);

      const finishedList = userBookList.filter((book) => book.status === "Finished");
      const wishList = userBookList.filter((book) => book.status === "Wish List");
      const readingList = userBookList.filter((book) => book.status === "Reading");
      const droppedList = userBookList.filter((book) => book.status === "Dropped");

      console.log(finishedList);

      this.setState({
        userBookList,
        finishedList,
        wishList,
        readingList,
        droppedList,
        currentUser: userId
      })
    }
  }



  render() {
    const userId = this.props.routerProps.match.params.id;
    const users = this.props.usersList;

    if (this.props.usersList && this.state.userBookList) {


      const singleUser = users.filter((user) => userId === user.id);
      const { name } = singleUser[0];

      return (
        <main className='user'>
          <div className='user__title-badge-container'>
            <h1 className='user__title'>{name}'s Shelves</h1>
            {this.state.finishedList &&
              <div className='user__badge'>
                <p className='user__books-finished-text'><span className='user__books-finished'>{this.state.finishedList.length}</span> BOOKS FINISHED</p>
                <img src={babyWorm} alt="baby worm bage" className='badge'></img>

              </div>
            }
          </div>

          {this.state.readingList &&
            <>
              <div className='user__list-wrapper'>
                <h3 className='user__subtitle'>Reading</h3>

                <ul className='books__image-container'>


                  {this.state.readingList.map((book, index) => {

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
              </div>
            </>
          }

          {this.state.wishList &&
            <>
              <div className='user__list-wrapper'>
                <div className='user__subtitle-wrapper'>
                  <h3 className='user__subtitle'>Wish List</h3>
                </div>

                <ul className='books__image-container'>


                  {this.state.wishList.map((book, index) => {

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
              </div>
            </>
          }

          {this.state.finishedList &&
            <>
              <div className='user__list-wrapper'>
                <div className='user__subtitle-wrapper'>
                  <h3 className='user__subtitle'>Finished</h3>
                </div>

                <ul className='books__image-container'>


                  {this.state.finishedList.map((book, index) => {

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
              </div>
            </>
          }

          {this.state.droppedList &&
            <>
              <div className='user__list-wrapper'>
                <h3 className='user__subtitle'>Dropped</h3>

                <ul className='books__image-container'>


                  {this.state.droppedList.map((book, index) => {

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
              </div>
            </>
          }
        </main>
      )
    }

  }
}

export default UserPage;