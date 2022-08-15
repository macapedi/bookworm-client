
import './App.scss';
import React from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from './pages/HomePage/HomePage';
import BookDetailsPage from './pages/BookDetailsPage/BookDetailsPage';
import PublicShelvesPage from "./pages/PublicShelvesPage/PublicShelvesPage";
import UserPage from "./pages/UserPage/UserPage";
import UserBookPage from './pages/UserBookPage/UserBookPage';
import UserBookPageEdit from './pages/UserBookPageEdit/UserBookPageEdit';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Singup';
import jwt_decode from 'jwt-decode';



class App extends React.Component {

  state = {

    usersList: "",
    usersBooks: "",
    booksList: [],
    list: [],
    loggedIn: false,
    failedAuth: true

  }

  async componentDidMount() {


    let token = this.getToken();
    console.log(token);
    if (token) {
      this.setState({
        loggedIn: true
      })
    }

    const url = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json'
    const key = "?api-key=MPpcrAgZYL3NCtOTzOVpM9K9D4DJGWee"
    const response = await axios.get(`${url}${key}`)
    const booksList = response.data.results.books;

    //Data from json files
    const usersReq = await axios.get('https://bookworm-capstone-api.herokuapp.com/users');
    const usersResp = usersReq.data;

    const booksReq = await axios.get('https://bookworm-capstone-api.herokuapp.com/books');
    const booksResp = booksReq.data;


    this.setState({
      booksList,
      list: response.data.results.books,
      usersList: usersResp,
      usersBooks: booksResp,

    });

  };

  // async componentDidUpdate() {

  //   let token = this.getToken();
  //   console.log(token);
  //   if (token) {
  //     this.setState({
  //       isLoggedIn: true
  //     })
  //   }

  // }

  getToken = () => {
    const token = sessionStorage.getItem('token');
    return token;
  }



  logoutHandler = () => {
   
      this.setState({
        loggedIn: false
      })
  }


  loginHandler = () => {

    console.log("this is triggered")
      this.setState({
        loggedIn: true
      })
  }


  statusChangeHandler = async () => {

    const usersReq = await axios.get('https://bookworm-capstone-api.herokuapp.com/users');
    const usersResp = usersReq.data;
    console.log(usersReq.data);

    const booksReq = await axios.get('https://bookworm-capstone-api.herokuapp.com/books');
    const booksResp = booksReq.data;
    this.setState({
      usersList: usersResp,
      userBooks: booksResp,
    });
  }
  handleFiction = async (date) => {
    const url = `https://api.nytimes.com/svc/books/v3/lists/${date}/hardcover-fiction.json`
    const key = "?api-key=MPpcrAgZYL3NCtOTzOVpM9K9D4DJGWee"
    const response = await axios.get(`${url}${key}`)
    const booksList = response.data.results.books;
    this.setState({
      booksList,
      list: response.data.results.books,
    })
  }

  handleNonFiction = async (date) => {

    const url = `https://api.nytimes.com/svc/books/v3/lists/${date}/hardcover-nonfiction.json`
    const key = "?api-key=MPpcrAgZYL3NCtOTzOVpM9K9D4DJGWee"
    const response = await axios.get(`${url}${key}`)
    const booksList = response.data.results.books;
    this.setState({
      booksList,
      list: response.data.results.books,
    })
  }




  render() {

console.log(this.state.loggedIn);

    return (
      <div className="App">
        <BrowserRouter>
          <Header loggedIn={this.state.loggedIn} logoutHandler={this.logoutHandler} />
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login" exact render={(routerProps) => {
              return (
                <Login
                routerProps={routerProps}
                loginHandler={this.loginHandler}
                />
              );
            }}
            />
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/books" exact render={(routerProps) => {
              return (
                <HomePage
                  list={this.state.list}
                  booksList={this.state.booksList}
                  routerProps={routerProps}
                  handleFiction={this.handleFiction}
                  handleNonFiction={this.handleNonFiction}

                />
              );
            }}
            />

            <Route path="/books/:id" exact render={(routerProps) => {
              return (
                <BookDetailsPage
                  statusChangeHandler={this.statusChangeHandler}
                  list={this.state.list}
                  booksList={this.state.booksList}
                  routerProps={routerProps} />
              );
            }}
            />
            <Route path="/users" exact render={(routerProps) => {
              return (
                <PublicShelvesPage
                  usersList={this.state.usersList}
                  routerProps={routerProps} />
              );
            }}
            />

            <Route path="/users/:id" exact render={(routerProps) => {
              return (
                <UserPage
                  usersList={this.state.usersList}
                  userBooks={this.state.usersBooks}
                  routerProps={routerProps} />
              );
            }}
            />
            <Route path="/users/:id/:bookId" exact render={(routerProps) => {
              return (
                <UserBookPage

                  usersList={this.state.usersList}
                  userBooks={this.state.usersBooks}
                  routerProps={routerProps} />
              );
            }}
            />
            <Route path="/users/:id/:bookId/edit" exact render={(routerProps) => {
              return (
                <UserBookPageEdit

                  usersList={this.state.usersList}
                  userBooks={this.state.usersBooks}
                  routerProps={routerProps} />
              );
            }}
            />




          </Switch>
        </BrowserRouter>

      </div>
    );

  }
}

export default App;
