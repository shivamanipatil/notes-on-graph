import React, {useState, useEffect} from 'react';
import getTopTags from '../backend-requests/getTopTags';
import {Link} from 'react-router-dom';
import styles from '../static/css/home.module.css';

const Welcome = () => {
    
    useEffect(() => {
        fetchItems();
    }, []);
    
    const [items, setItems] = useState([]); 
    const fetchItems = async () => {
        const data = await getTopTags();
        setItems(data);
    };
    return(
      <div className={styles.divClass}>
        <h1 className={styles.fontClassh1}>Tops tags in world</h1>
        {items.map(item => (
            <h3 className={styles.fontClassh3}>
                <Link to={`/songs/${item}`} style={{'text-decoration': 'none'}}>{item}</Link>
            </h3>
        )) }
      </div>
    );
}

export default Welcome;