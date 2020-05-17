import React from 'react';
import './App.css';
import About from './components/Discover';
import Login from './components/Login';
import Nav from "./components/Nav";
import Profile from "./components/Profile"
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AuthComponent from './components/AuthComponent';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      login: false, 
    }
  }
  render() {
    return(
      <BrowserRouter>      
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <AuthComponent>
              <Route path="/discover" component={About} />
              <Route path="/profile" component={Profile} />
            </AuthComponent>
          </Switch>
      </BrowserRouter>
    );
  }
}

const Home = () => (
  <div>
    <h1>Home</h1>
    <h2>Welcome to notes on graph</h2>
  </div>
);

export default App;