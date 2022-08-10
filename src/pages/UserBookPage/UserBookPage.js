import React from 'react';
import "./UserBookPage.scss";
import axios from "axios";
import { Link } from 'react-router-dom';
import ShelveInput from '../../components/ShelveInput/ShelveInput';
import backIcon from '../../assets/icons/back.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';
import jwt_decode from "jwt-decode";


class UserBookPage extends React.Component {
  state = {
    singleUserBook: ""
  }


  async componentDidMount() {

    const userId = this.props.routerProps.match.params.id;
    const bookId = this.props.routerProps.match.params.bookId;


    const booksRequest = await axios.get("http://localhost:8080/books");

    const books = booksRequest.data;

    const singleUserBook = books.filter((book) => book.user_id == userId && bookId == book.primary_isbn10);

    this.setState({
      singleUserBook: singleUserBook[0]
    })

  }
  // async componentDidUpdate() {
  //   const userId = this.props.routerProps.match.params.id;
  //   const bookId = this.props.routerProps.match.params.bookId;


  //   const booksRequest = await axios.get("http://localhost:8080/books");

  //   const books = booksRequest.data;

  //   const singleUserBook = books.filter((book) => book.user_id == userId && bookId == book.primary_isbn10);

  //   this.setState({
  //     singleUserBook: singleUserBook[0]
  //   })

  // }



  shelveChangeHandler = async () => {

    const userId = this.props.routerProps.match.params.id;
    const bookId = this.props.routerProps.match.params.bookId;


    const booksRequest = await axios.get("http://localhost:8080/books");

    const books = booksRequest.data;

    const singleUserBook = books.filter((book) => book.user_id == userId && bookId == book.primary_isbn10);

    this.setState({
      singleUserBook: singleUserBook[0]
    })
  }

  editHandleButton = () => {
    const userId = this.props.routerProps.match.params.id;
    const bookId = this.props.routerProps.match.params.bookId;
    this.props.routerProps.history.push(`/users/${userId}/${bookId}/edit`);
  }

  deleteButtonHandler = async () => {
    const userId = this.props.routerProps.match.params.id;
    const bookId = this.props.routerProps.match.params.bookId;

    await axios.delete(`http://localhost:8080/users/${userId}/${bookId}`)

    this.props.routerProps.history.push(`/users/${userId}`)

  }





  render() {

    console.log(this.props.routerProps.match.path);

    const userId = this.props.routerProps.match.params.id;

    const tokenDecoded = jwt_decode(sessionStorage.getItem('token'));
    console.log(tokenDecoded);

    const currentUserId = tokenDecoded.id; // 
    const bookId = this.props.routerProps.match.params.bookId;

    if (this.state.singleUserBook !== "") {


      const { book_image, author, description, primary_isbn10, title, rank } = this.state.singleUserBook;



      return (
        <>
          <div className='user-book-details'>
            <div className='user-book-details__container'>
              <img src={book_image} alt={title} className="user-book-details__image"></img>
              <div>
                <div className='user-book-details_text-wrapper'>
                  <p className='first-word'>Title: <span>{title}</span></p>
                  <p className='first-word'>Author: <span>{author}</span></p>
                  <p className='first-word'>Description: <span>{description}</span></p>

                  {userId == currentUserId && <ShelveInput shelveChangeHandler={this.shelveChangeHandler} routerProps={this.props.routerProps} singleUserBook={this.state.singleUserBook} />}
                </div>


                <div className='user-book-details__notes-bigcontainer'>

                  <p className='first-word'>Notes:</p>
                  <div onClick={this.editHandleButton} className='book-details__notes-container'>
                    <p className='user-book-details__notes'>{this.state.singleUserBook.notes}</p>
                  </div>
                </div>

                {userId == currentUserId &&
                  <div className='user-book-details__button-container'>
                    {/* <Link to={`/users/${userId}/${bookId}/edit`}> */}
                    <button onClick={this.editHandleButton} className='button'><img className='icon' src={editIcon} alt="edit icon"></img>Edit Note</button>
                    <button onClick={this.deleteButtonHandler} className='button'><img className='icon' src={deleteIcon} alt="delete icon"></img>Delete Book</button>

                  </div>}
              </div>
            </div>
          </div>
        </>
      );
    } else {
      <p>Loading...</p>
    }
  }
}


export default UserBookPage;