
import './App.scss';
import React from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from './pages/HomePage/HomePage';
import BookDetailsPage from './pages/BookDetailsPage/BookDetailsPage';
import PublicShelvesPage from "./pages/PublicShelvesPage/PublicShelvesPage";
import UserPage from "./pages/UserPage/UserPage";
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Singup';



class App extends React.Component {

  state = {
    user: null,
    failedAuth: false,

    booksList: null,


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


    const url = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json'
    const key = "?api-key=MPpcrAgZYL3NCtOTzOVpM9K9D4DJGWee"
    const response = await axios.get(`${url}${key}`)
    const booksList = response.data;



    this.setState({
      booksList
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

    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
            <Route path="/login" exact component={Login} />
            <Route path="/signup">
              <Signup />
            </Route>
            <Route path="/books" exact render={(routerProps) => {
              return (
                <HomePage
                  booksList={this.state.booksList}
                  user={this.state.user}
                  failedAuth={this.state.failedAuth}
                  routerProps={routerProps} />
              );
            }}
            />

            <Route path="/books/:id" exact render={(routerProps) => {
              return (
                <BookDetailsPage
                  booksList={this.state.booksList}
                  routerProps={routerProps} />
              );
            }}
            />
            <Route path="/users" exact component={PublicShelvesPage} />
            <Route path="/users/:id" component={UserPage} />
          </Switch>
        </BrowserRouter>

      </div>
    );

  }
}

export default App;
