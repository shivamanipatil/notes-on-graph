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
    <div className={styles.container}>
    <h1 className={styles.fontClassh1}>Tops tags in world</h1>
      <div className={styles.divClass}>
        {items.map(item => (
            <h3 className={styles.fontClassh3}>
                <Link to={`/songs/${item.tag}`} style={{'text-decoration': 'none'}}>{item.tag}</Link>
            </h3>
        )) }
      </div>
    </div>
    );
}

export default Welcome;