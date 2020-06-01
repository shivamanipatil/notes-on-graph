import React, {useState, useEffect} from 'react';
import searchArtist from '../backend-requests/searchArtist';
import styles from '../static/css/songtag.module.css';

const ArtistSearch = () => {
    useEffect(() => {
        fetchItems();
    }, []);
    
    const [items, setItems] = useState([]); 
    const fetchItems = async () => {
        const data = await searchArtist('drake');
        setItems(data);
    };
    return(
      <div className={styles.divClass}>
        <h1 className={styles.fontClassh1}>Here</h1>
        {items.map(item => (
            <h3 className={styles.fontClassh3}>
                {item.artist} <br/> - <span className={styles.spanClass}>{item.artist}</span>
            </h3>
        )) }
      </div>
    );
}

export default ArtistSearch;