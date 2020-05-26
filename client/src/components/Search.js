import React, {useState} from 'react';
import { withRouter} from 'react-router-dom';
import styles from '../static/css/search.module.css';

function SearchArtist(props) {
    const [artist, setArtist] = useState('');
    const [limit, setLimit] = useState(3);
    return(
      <div className={styles.divClass}>
        <h1 className={styles.fontClassh1}>Search similar artists</h1>
        <form onSubmit={() => {props.history.push(`/artist?name=${artist}&limit=${limit}`)}}>
          <div className="form-input">
            <input 
              type="text"
              name="artist"
              placeholder="Artist"
              value={artist}
              className={styles.inputArtist}
              onChange={(e) => {setArtist(e.target.value);console.log(artist)}}
            />
            <input 
              type="number"
              name="limit"
              placeholder="Number of results"
              value={limit}
              className={styles.inputArtist}
              onChange={(e) => {setLimit(e.target.value);console.log(limit)}}
            />
          </div>
          <button className={styles.button}>Search</button>
        </form>
      </div>
    );
}

export default withRouter(SearchArtist);