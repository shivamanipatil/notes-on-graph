import React from 'react';
import './App.css';
import Login from './components/Login';
import Nav from "./components/Nav";
import Profile from "./components/Profile"
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AuthComponent from './components/AuthComponent';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Register from './components/Register';
import Logout from './components/Logout';
import SongsFromTag from './components/SongsFromTag';
import SearchSimilar from './components/Search/SearchSimilar';
import SimilarArtist from './components/Search/SimilarArtist';
import SearchArtist from './components/Search/SearchArtist';
import Artist from './components/Search/Artist';
import Song from './components/Search/Song';
import SearchSong from './components/Search/SearchSong';
import Discover from './components/Discover';
import Graph from './components/chart/graph';
import SearchHome from './components/Search/SearchHome';


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
            <Route path="/register" component={Register} />
            <AuthComponent>
              <Nav />
              <Route path="/home" exact component={Home} />
              <Route path="/search" exact component={SearchHome} />
              <Route path="/chart" exact component={Graph} />
              <Route path="/discover" exact component={Discover} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/logout" exact component={Logout} />
              <Route path="/search/artist" exact component={SearchArtist} />
              <Route path="/search/song" exact component={SearchSong} />
              <Route path="/similar/artist" exact component={SearchSimilar} />
              <Route path="/songs/:tag" exact component={SongsFromTag} />
              <Route path="/artist" exact component={SimilarArtist} />
              <Route path="/artistSearch" exact component={Artist} />
              <Route path="/songSearch" exact component={Song} />
            </AuthComponent>
          </Switch>
      </BrowserRouter>
    );
  }
}

export default App;