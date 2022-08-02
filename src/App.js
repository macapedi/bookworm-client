
import './App.scss';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from './pages/HomePage/HomePage';
import BookDetailsPage from './pages/BookDetailsPage/BookDetailsPage';
import PublicShelvesPage from "./pages/PublicShelvesPage/PublicShelvesPage";
import UserPage from "./pages/UserPage/UserPage";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <Switch>
      <Route exact path="/">
                  <Redirect to="/books" />
                </Route>
      <Route path="/books" exact component={HomePage}/>
      <Route path="/books/:id" component={BookDetailsPage}/>
      <Route path="/users" exact component={PublicShelvesPage}/>
      <Route path="/users/:id" component={UserPage}/>
      </Switch>
      </BrowserRouter>




   
    </div>
  );
}

export default App;
