import React, {useState, useEffect} from 'react';
import searchSong from '../../backend-requests/searchSong';
import likeSong from '../../backend-requests/likesong';
import queryString from 'query-string';
import styles from '../../static/css/searchsong.module.css';


const Song = ({location}) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
      fetchItems();
  }, []);
  
  const fetchItems = async () => {
      const values = queryString.parse(location.search);
      const data = await searchSong(values.name, values.limit);
      const newData = data.map((item) => {
        return {
          artist: item.artist,
          track: item.track
        }
      })
      setItems(newData);
  };
  const likesong = (name) => {
    try {
        console.log(name);
        likeSong(name);
        alert('Liked')
    } catch(e) {
        console.log('Could not like');   
    }
};
  return (
    <div className={styles.divClass}>
        <h3 className={styles.subHeading}>Search results</h3>
        {items.map(item => (
            <h3 className={styles.fontClassh3}>
            {item.track} <span onClick={(e) => {likesong(item.track)}}  className={styles.like}>&#128156;</span><br/> - <span className={styles.spanClass}>{item.artist}</span>
            </h3>
        )) }
    </div> 
  );
}

export default Song;