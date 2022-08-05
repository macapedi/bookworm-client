import React from 'react';
import "./HomePage.scss";
import { Link } from "react-router-dom";
import axios from "axios";
class HomePage extends React.Component {




  render() {

console.log(this.props.booksList);
    if (this.props.booksList) {

      return (
        <>
          <h1>This is Home Page</h1>
          <ul className='books__image-container'>

            {this.props.booksList.results.books.map((book, index) => {


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
