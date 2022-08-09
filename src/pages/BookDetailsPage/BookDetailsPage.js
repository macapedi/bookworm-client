import React from 'react';
import "./BookDetailsPage.scss";
import StateInput from '../../components/StateInput/StateInput';
import axios from "axios";

class BookDetailsPage extends React.Component {
  state = {
    singleBook: null
  }


  componentDidMount() {
    const bookId = this.props.routerProps.match.params.id;
    const books = this.props.booksList;


    const singleBook = books.filter((book) => bookId === book.primary_isbn10);
    this.setState({
      singleBook
    })
  }











  render() {




    if (this.props.booksList.length) {

      const bookId = this.props.routerProps.match.params.id;
      const books = this.props.booksList;


      const singleBook = books.filter((book) => bookId === book.primary_isbn10);
      const { book_image, author, description, primary_isbn10, title, rank } = singleBook[0];



      return (
        <>
          <div className='home-book-details'>
            <h1 className='home-book-details__title'>Book Details</h1>
            <div className='home-book-details__container'>
              <img src={book_image} alt={title} className="home-book-details__image"></img>
              <div className='home-book-details_text-wrapper'>
                <p className='first-word'>Title: <span>{title}</span></p>
                <p className='first-word'>Author: <span>{author}</span></p>
                <p className='first-word'>Description: <span>{description}</span></p>

                <StateInput statusChangeHandler={this.props.statusChangeHandler} routerProps={this.props.routerProps} booksList={this.props.booksList} />

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

export default BookDetailsPage;
