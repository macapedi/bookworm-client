import React from 'react';
import "./BookDetailsPage.scss";
import axios from "axios";

class BookDetailsPage extends React.Component {
  state = {
    singleBook: null
  }

  // filteredBook = () => {
  //   const bookId = this.props.routerProps.match.params.id;
  //   const books = this.props.booksList.results.books;

  //   const singleBook = books.filter((book, index) => bookId === book[index].primary_isbn10);
  //   return this.setState({
  //     singleBook
  //   })
  // }


  componentDidMount() {
    const bookId = this.props.routerProps.match.params.id;
    const books = this.props.booksList.results.books;


    const singleBook = books.filter((book) => bookId === book.primary_isbn10);
    this.setState({
      singleBook
    })
  }










  render() {
    

    console.log(this.props.routerProps.match.params.id);

    if (this.state.singleBook) {
      const { book_image, author, description, primary_isbn10, title, rank } = this.state.singleBook[0];
      console.log(book_image)


      return (
        <>
          <h1>Book Details</h1>
          <div className='book-details__container'>
            <img src={book_image} alt={title} className="book-details__image"></img>
            <div className='book-details_text-wrapper'>
              <p>Title: {title}</p>
              <p>Author: {author}</p>
              <p>Description: {description}</p>
              <p>List:</p>
              <input type="radio"></input>

            </div>

          </div>

        </>
      );
    } else {
      <p>Loading...</p>
    }
  }
}

export default BookDetailsPage;
