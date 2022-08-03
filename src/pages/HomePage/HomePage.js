import React from 'react';
import "./HomePage.scss";
import axios from "axios";
import { Link } from "react-router-dom";

class HomePage extends React.Component {

  state = {
    booksList: this.props.booksList

  }






  render() {
    console.log(this.state.booksList.results.books);

    if (this.state.booksList) {

      return (
        <>
          <h1>This is Home Page</h1>
          <ul className='books__image-container'>

            {this.state.booksList.results.books.map((book, index) => {
              console.log(book.primary_isbn10);

              return (


                <li key={book.primary_isbn10} className="books__container">
                  <Link to={`/books/${book.primary_isbn10}`} className='books__container'>

                    <img className='books__image' src={book.book_image}></img>


                  </Link>
                </li>
              )

            })}

          </ul>

        </>
      );
    } else {
      return <p>Loading...</p>
    }
  }
}

export default HomePage;
