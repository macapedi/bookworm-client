
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



class App extends React.Component {

  state = {

    usersList: "",
    usersBooks: "",
    booksList: [],
    list: [],


    user: {},
    failedAuth: false,

  }

  async componentDidMount() {

    //authentication

    const token = sessionStorage.getItem('token');

    if (!token) {
      this.setState({ failedAuth: true });
      return;
    }

    // Get the data from the API
    try {
      const userData = await axios.get('http://localhost:8080/api/users/current', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      this.setState({
        user: userData.data,
      })
    } catch (error) {
      this.setState({
        failedAuth: true,
      });
      return;
    }


    const url = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json'
    const key = "?api-key=MPpcrAgZYL3NCtOTzOVpM9K9D4DJGWee"
    const response = await axios.get(`${url}${key}`)
    const booksList = response.data.results.books;


    //Data from json files
    const usersReq = await axios.get("http://localhost:8080/users");
    const usersResp = usersReq.data;




    const booksReq = await axios.get("http://localhost:8080/books");
    const booksResp = booksReq.data;

    this.setState({

      booksList,
      list: response.data.results.books,
      usersList: usersResp,
      usersBooks: booksResp,

    });

  };

  // async componentDidUpdate() {

  //   const userId = this.props.routerProps.match.params.id;
  //   const userBookListReq = await axios.get(`http://localhost:8080/users/${userId}`);

  //   const userBookList = userBookListReq.data.inventoryBooks;

  //   this.setState({
  //     userBookList
  //   })

  // }

  statusChangeHandler = async () => {

    const usersReq = await axios.get("http://localhost:8080/users");
    const usersResp = usersReq.data;
    console.log(usersReq.data);

    const booksReq = await axios.get("http://localhost:8080/books");
    const booksResp = booksReq.data;
    this.setState({
      usersList: usersResp,
      userBooks: booksResp,
    });
  }
  handleFiction = async () => {
    const url = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json'
    const key = "?api-key=MPpcrAgZYL3NCtOTzOVpM9K9D4DJGWee"
    const response = await axios.get(`${url}${key}`)
    const booksList = response.data.results.books;
    this.setState({
      booksList,
      list: response.data.results.books,
    })
  }

  handleNonFiction = async () => {

    const url = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-nonfiction.json'
    const key = "?api-key=MPpcrAgZYL3NCtOTzOVpM9K9D4DJGWee"
    const response = await axios.get(`${url}${key}`)
    const booksList = response.data.results.books;
    this.setState({
      booksList,
      list: response.data.results.books,
    })
  }

  handleLogout = () => {
    sessionStorage.removeItem('token');
    this.setState({
      user: null,
      failedAuth: true,
    });
  };




  render() {


    const { id, email } = this.state.user;

    console.log(id, email);



    return (
      <div className="App" >
        <BrowserRouter>
          <Header handleLogout={this.handleLogout} />
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login">
              <Login />
            </Route>

            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/books" exact render={(routerProps) => {
              return (this.state.failedAuth ? <Redirect to="/login" /> : <HomePage
                list={this.state.list}
                booksList={this.state.booksList}
                routerProps={routerProps}
                handleFiction={this.handleFiction}
                handleNonFiction={this.handleNonFiction}

              />);
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
                  routerProps={routerProps}
                // userName={name}

                />
              );
            }}
            />

            <Route path="/users/:id" exact render={(routerProps) => {
              console.log("id from params",routerProps.match.params.id)
              const urlId = routerProps.match.params.id;
              return (
                <UserPage
                  userId={urlId== "me"?id:urlId}
                  usersList={this.state.usersList}
                  userBooks={this.state.userBooks}
                  routerProps={routerProps} />
              );
            }}
            />
            <Route path="/users/:id/:bookId" exact render={(routerProps) => {
              return (
                <UserBookPage

                  usersList={this.state.usersList}
                  userBooks={this.state.userBooks}
                  routerProps={routerProps} />
              );
            }}
            />
            <Route path="/users/:id/:bookId/edit" exact render={(routerProps) => {
              return (
                <UserBookPageEdit

                  usersList={this.state.usersList}
                  userBooks={this.state.userBooks}
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
