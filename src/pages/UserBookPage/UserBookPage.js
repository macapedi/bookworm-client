import React from 'react';
import "./UserBookPage.scss";
import axios from "axios";
import { Link } from 'react-router-dom';
import ShelveInput from '../../components/ShelveInput/ShelveInput';
import backIcon from '../../assets/icons/back.svg';
import deleteIcon from '../../assets/icons/delete.svg';
import editIcon from '../../assets/icons/edit.svg';


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

deleteHandleButton = async () => {
  const userId = this.props.routerProps.match.params.id;
  const bookId = this.props.routerProps.match.params.bookId;

  try {
    axios.delete(`http://localhost:8080/users/${userId}${bookId}`)
  }
  catch(error){
    console.log("some little bug");
  }

  this.props.routerProps.history.push(`/users/${userId}`)
  
}





render() {

  console.log(this.props.routerProps.match.path);

  const userId = this.props.routerProps.match.params.id;
  const currentUserId = "2922c286-16cd-4d43-ab98-c79f698aeab0";
  const bookId = this.props.routerProps.match.params.bookId;

  if (this.state.singleUserBook) {


    const { book_image, author, description, primary_isbn10, title, rank } = this.state.singleUserBook;



    return (
      <>
        <h1 className='book-details__title'>Book Details for Specific User</h1>
        <div className='book-details__container'>
          <img src={book_image} alt={title} className="book-details__image"></img>
          <div className='book-details_text-wrapper'>
            <p className='first-word'>Title: <span>{title}</span></p>
            <p className='first-word'>Author: <span>{author}</span></p>
            <p className='first-word'>Description: <span>{description}</span></p>

            {userId == currentUserId && <ShelveInput shelveChangeHandler={this.shelveChangeHandler} routerProps={this.props.routerProps} singleUserBook={this.state.singleUserBook} />}
          </div>

          <div className='book-details__notes-bigcontainer'>
            <div className='book-details__notes-container'>
              <p className='first-word'>Notes:</p>
              <p>{this.state.singleUserBook.notes}</p>
            </div>

            {userId == currentUserId &&
              <div className='book-details__button-container'>
                {/* <Link to={`/users/${userId}/${bookId}/edit`}> */}
                <button onClick={this.editHandleButton}><img className='icon' src={editIcon} alt="edit icon"></img>Add Note</button>
                <button onClick={this.deleteButtonHandler}><img className='icon' src={deleteIcon} alt="delete icon"></img>Delete Book</button>



              </div>}
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