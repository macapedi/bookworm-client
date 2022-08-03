
import './App.scss';
import React from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from './pages/HomePage/HomePage';
import BookDetailsPage from './pages/BookDetailsPage/BookDetailsPage';
import PublicShelvesPage from "./pages/PublicShelvesPage/PublicShelvesPage";
import UserPage from "./pages/UserPage/UserPage";
import Login from './pages/Login/Login';



class App extends React.Component {

  state = {
    booksList: null

  }

  async componentDidMount() {

    const url = 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json'
    const key = "?api-key=MPpcrAgZYL3NCtOTzOVpM9K9D4DJGWee"
    const response = await axios.get(`${url}${key}`)
    const booksList = response.data;
    console.log(response.data);


    this.setState({
      booksList
    })
  }


render() {

if(this.state.booksList){


  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" exact component={Login} />
          <Route path="/books" exact >
            <HomePage booksList={this.state.booksList}/>
          </Route>
          <Route path="/books/:id" component={BookDetailsPage} />
          <Route path="/users" exact component={PublicShelvesPage} />
          <Route path="/users/:id" component={UserPage} />
        </Switch>
      </BrowserRouter>

    </div>
  );
} else{
  <p>Loading...</p>
}
}
}

export default App;
