import React from 'react';
import "./HomePage.scss";
import { Link } from "react-router-dom";

class HomePage extends React.Component {

  state= {
    fictionCategory: true,
    nonFictionCategory: false
  }

  fictionHandler = ()=>{
    this.setState({
      fictionCategory: true,
      nonFictionCategory:false
    })
    this.props.handleFiction();
  }

  nonFictionHandler = ()=>{
    this.setState({
      fictionCategory: false,
      nonFictionCategory:true
    })
    this.props.handleNonFiction();
  }

  render() {
console.log(this.props.list)
    
    if (this.props.list.length) {

      return (
        <>
          <h1 className='books-home__title'>Best Sellers List</h1>
          <div className='books-home__button-wrapper'>
            <button onClick={this.fictionHandler} className="books-home__button">Fiction</button>
            <button onClick={this.nonFictionHandler} className="books-home__button">Non Fiction</button>

          </div>



          <ul className='books-home__image-container'>

            {this.props.list.map((book, index) => {


              return (


                <li key={book.primary_isbn10} className="books-home__container">
                  <Link to={`/books/${book.primary_isbn10}`} className='books-home__container'>

                    <div className='books-home__wrapper'>
                    {/* <p className='books__rank'> {book.rank}</p> */}
                    <img className='books-home__image' src={book.book_image}></img>
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
