import React from 'react';
import "./HomePage.scss";
import { Link } from "react-router-dom";
import axios from "axios";
class HomePage extends React.Component {

  state = {
    booksList: this.props.booksList

  }

async componentDidMount() {
const token = sessionStorage.getItem('token');

    if (!token) {
      return this.setState({ failedAuth: true });
    }

    const userPromise = await axios.get('http://localhost:8080/api/users/current', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = userPromise.data;
    this.setState({
      user
    })
  }


  render() {

    if (this.state.failedAuth) {
      return (
        <main className="dashboard">
          <p>
            You must be logged in to see this page.{' '}
            <Link to="/login">Log in</Link>
          </p>
        </main>
      );
    }
    if (!this.state.user) {
      <div className="App">
        <p>Loading...</p>
      </div>
    }


      if (this.state.booksList) {

        return (
          <>
            <h1>This is Home Page</h1>
            <ul className='books__image-container'>

              {this.state.booksList.results.books.map((book, index) => {


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
