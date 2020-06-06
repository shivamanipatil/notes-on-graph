import React, {useState} from 'react';
import { withRouter} from 'react-router-dom';
import styles from '../../static/css/search.module.css';

function SearchSong(props) {
    const [song, setSong] = useState('');
    const [limit, setLimit] = useState(3);
    return(
      <div className={styles.divClass}>
        <h1 className={styles.fontClassh1}>Search songs</h1>
        <form onSubmit={() => {props.history.push(`/songSearch?name=${song}&limit=${limit}`)}}>
          <div className="form-input">
            <input 
              type="text"
              name="song"
              placeholder="song"
              value={song}
              className={styles.inputArtist}
              onChange={(e) => {setSong(e.target.value);console.log(song)}}
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

export default withRouter(SearchSong);