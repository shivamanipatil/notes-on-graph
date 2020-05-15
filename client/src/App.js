import React from 'react';
import './App.css';
import About from './components/Discover';
import Login from './components/Login';
import Nav from "./components/Nav";
import Profile from "./components/Profile"
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      login: false, 
    }
  }
  render() {
    return(
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/discover" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
          </Switch>
 
        </div>
      </Router>
    );
  }
}

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

export default App;