import React, {useState, useEffect} from 'react';
import {Link, withRouter} from 'react-router-dom';

function SearchArtist(props) {
    const [artist, setArtist] = useState('');
    const [limit, setLimit] = useState(3);
    return(
      <div>
        <form onSubmit={() => {props.history.push(`/artist?name=${artist}&limit=${limit}`)}}>
          <div className="form-input">
            <input 
              type="text"
              name="artist"
              placeholder="Artist"
              value={artist}
              onChange={(e) => {setArtist(e.target.value);console.log(artist)}}
            />
            <input 
              type="number"
              name="limit"
              placeholder="Number of results"
              value={limit}
              onChange={(e) => {setLimit(e.target.value);console.log(limit)}}
            />
          </div>
          <button>Search</button>
        </form>
      </div>
    );
}

export default withRouter(SearchArtist);