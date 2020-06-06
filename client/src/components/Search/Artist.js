import React, {useState, useEffect} from 'react';
import searchArtist from '../../backend-requests/searchArtist';
import likeArtist from '../../backend-requests/likeartist';
import queryString from 'query-string';
import styles from '../../static/css/searchartist.module.css';


const Artist = ({location}) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
      fetchItems();
  }, []);
  
  const fetchItems = async () => {
      const values = queryString.parse(location.search);
      const data = await searchArtist(values.name, values.limit);
      const newData = data.map((item) => {
        return {
          artist: item
        }
      })
      console.log(newData)
      setItems(newData);
  };
  const likeartist = (name) => {
    try {
        console.log(name);
        likeArtist(name);
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
                {item.artist.artist} <span onClick={(e) => {likeartist(item.artist.artist)}} className={styles.like}>&#128156;</span>
            </h3>
        )) }
    </div> 
  );
}

export default Artist;