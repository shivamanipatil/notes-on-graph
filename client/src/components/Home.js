import React, {useState, useEffect} from 'react';
import getTopTags from '../backend-requests/getTopTags';
import {Link} from 'react-router-dom';

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
      <div>
        <h1>Tops tags in world</h1>
        {items.map(item => (
            <h3>
                <Link to={`/songs/${item}`}>{item}</Link>
            </h3>
        )) }
      </div>
    );
}

export default Welcome;