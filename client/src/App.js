import React from 'react';
import './App.css';
import Login from './components/Login';
import Nav from "./components/Nav";
import Profile from "./components/Profile"
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AuthComponent from './components/AuthComponent';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Logout from './components/Logout';
import SongsFromTag from './components/SongsFromTag';
import SearchArtist from './components/Search';
import SimilarArtist from './components/SimilarArtist';
import ArtistSearch from './components/ArtistSearch';
import Discover from './components/Discover';
import Graph from './components/chart/graph';


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
            <Route path="/" exact component={Welcome} />
            <Route path="/login" component={Login} />
            <AuthComponent>
              <Nav />
              <Route path="/search/artist" component={ArtistSearch} />
              <Route path="/home" component={Home} />
              <Route path="/chart" component={Graph} />
              <Route path="/discover" component={Discover} />
              <Route path="/profile" component={Profile} />
              <Route path="/logout" component={Logout} />
              <Route path="/similar/artist" component={SearchArtist} />
              <Route path="/songs/:tag" component={SongsFromTag} />
              <Route path="/artist" component={SimilarArtist} />
            </AuthComponent>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;