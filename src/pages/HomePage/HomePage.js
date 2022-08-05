import React from 'react';
import "./HomePage.scss";
import { Link } from "react-router-dom";

class HomePage extends React.Component {




  render() {
console.log(this.props.list)
    
    if (this.props.list.length) {

      return (
        <>
          <h1 className='books__title'>Best Sellers List</h1>
          <ul className='books__image-container'>

            {this.props.list.map((book, index) => {


              return (


                <li key={book.primary_isbn10} className="books__container">
                  <Link to={`/books/${book.primary_isbn10}`} className='books__container'>

                    <div className='books__wrapper'>
                    {/* <p className='books__rank'> {book.rank}</p> */}
                    <img className='books__image' src={book.book_image}></img>
                    </div>

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
