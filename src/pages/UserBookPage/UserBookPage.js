import React from 'react';
import "./UserBookPage.scss";
import axios from "axios";

class UserBookPage extends React.Component {
  // state = {
  //   singleBook: null
  // }

  
  // componentDidMount() {
  //   const bookId = this.props.routerProps.match.params.id;
  //   const books = this.props.booksList;


  //   const singleBook = books.filter((book) => bookId === book.primary_isbn10);
  //   this.setState({
  //     singleBook
  //   })
  // }










  render() {
    

    // console.log(this.props.booksList);

    // if (this.props.booksList.length) {

    //   const bookId = this.props.routerProps.match.params.id;
    //   const books = this.props.booksList;
  
  
    //   const singleBook = books.filter((book) => bookId === book.primary_isbn10);
    //   const { book_image, author, description, primary_isbn10, title, rank } = singleBook[0];
   


      return (
        <>
          <h1>Book Details for specific User</h1>
        </>
      );
  }
}

export default UserBookPage;