import React, {useState, useEffect} from 'react';
import discover from '../backend-requests/discoverSongs';
import styles from '../static/css/discover.module.css';
import likeSong from '../backend-requests/likesong';


function Discover() {
    
    useEffect(() => {
        fetchItems();
    }, []);
    
    const [items, setItems] = useState([]); 
    const fetchItems = async () => {
        const data = await discover();
        setItems(data);
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
    return(
    <div className={styles.container}>
        <h1 className={styles.fontClassh1}>Songs found for you</h1>
        <h3 className={styles.subHeading}>Click <span>&#11088;</span> to add to favourites</h3>
      <div className={styles.divClass}>
        {items.map(item => (
            <h3 className={styles.fontClassh3}>
                <span onClick={(e) => {likesong(item.name)}}  className={styles.like}>&#11088;</span>
                {item.name}
            </h3>
        )) }
      </div>
      </div>
    );
}

export default Discover;