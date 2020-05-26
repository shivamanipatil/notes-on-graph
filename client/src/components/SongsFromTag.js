import React, {useState, useEffect} from 'react';
import songsFromTag from '../backend-requests/songFromTags';
import {Link} from 'react-router-dom';
import styles from '../static/css/songtag.module.css';

const SongsFromTag = ({match}) => {
    
    useEffect(() => {
        fetchItems();
    }, []);
    
    const [items, setItems] = useState([]); 
    const fetchItems = async () => {
        const data = await songsFromTag(match.params.tag);
        console.log(data)
        setItems(data);
    };
    return(
      <div className={styles.divClass}>
        <h1 className={styles.fontClassh1}>Songs for {match.params.tag}</h1>
        {items.map(item => (
            <h3 className={styles.fontClassh3}>
                {item.name} by {item.artist}
            </h3>
        )) }
      </div>
    );
}

export default SongsFromTag;