import React from 'react';
import "./UserBookPage.scss";
import axios from "axios";

class UserBookPage extends React.Component {
  state = {
    singleUserBook: []
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










  render() {

    console.log(this.state.singleUserBook);

    // if (this.props.userBooks.length !==0) {

    // const bookId = this.props.routerProps.match.params.id;
    // const books = this.props.booksList;


    // const singleBook = books.filter((book) => bookId === book.primary_isbn10);
    // const { book_image, author, description, primary_isbn10, title, rank } = singleBook[0];



    return (
      <>
        <h1>Book Details for specific User</h1>
      </>
    );
  }
  // }
}

export default UserBookPage;