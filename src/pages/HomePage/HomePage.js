import React from 'react';
import "./HomePage.scss";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer.js";

class HomePage extends React.Component {

  state = {
    fictionCategory: true,
    nonFictionCategory: false,
    date: "current"
  }

  fictionHandler = () => {
    const date = this.state.date;
    this.setState({
      fictionCategory: true,
      nonFictionCategory: false
    })
    this.props.handleFiction(date);
  }

  nonFictionHandler = () => {

    const date = this.state.date;
    this.setState({
      fictionCategory: false,
      nonFictionCategory: true
    })
    this.props.handleNonFiction(date);
  }

  dateHandler = (event) => {
    this.setState({
      date: event.target.value
    });

  }


  render() {
   

    if (this.props.list.length) {

      return (
        <>
          <div className='books-home'>
            <h1 className='books-home__title'> NYT Best Sellers</h1>
            <div className='books-home__button-container'>
              <div className='books-home__button-wrapper'>
                <button onClick={this.fictionHandler} className={
                  "books-home__button books-home__button" +
                  (this.state.fictionCategory === true ? "--selected" : "")}><span className='books-home__button-text'>Fiction</span></button>
                <button onClick={this.nonFictionHandler} className={
                  "books-home__button books-home__button" +
                  (this.state.nonFictionCategory === true ? "--selected" : "")}><span className='books-home__button-text'>Non Fiction</span></button>
              </div>
              <select value={this.state.value} onChange={this.dateHandler} className={"books-home__dropdown"}>
                <option value="current">Current</option>
                <option value="2022-01-01">2022-01-01</option>
                <option value="2022-02-01">2022-02-01</option>
                <option value="2022-03-01">2022-03-01</option>
                <option value="2022-04-01">2022-04-01</option>
                <option value="2022-05-01">2022-05-01</option>
                <option value="2022-06-01">2022-06-01</option>
                <option value="2022-07-01">2022-07-01</option>
                <option value="2022-08-01">2022-07-01</option>
              </select>
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
          </div>
          <Footer />

        </>
      );
    } else {
      return <p>Loading...</p>
    }
  }
}

export default HomePage;
