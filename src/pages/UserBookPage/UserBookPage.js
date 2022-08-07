import React from 'react';
import "./UserBookPage.scss";
import axios from "axios";
import ShelveInput from '../../components/ShelveInput/ShelveInput';


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







  render() {



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
            
              <ShelveInput shelveChangeHandler={this.props.shelveChangeHandler} routerProps={this.props.routerProps} singleUserBook={this.state.singleUserBook}/>
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