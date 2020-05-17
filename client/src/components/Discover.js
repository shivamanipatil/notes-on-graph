import React, {useState, useEffect} from 'react';
import discover from '../backend-requests/discoverSongs'

function Discover() {
    
    useEffect(() => {
        fetchItems();
    }, []);
    
    const [items, setItems] = useState([]); 
    const fetchItems = async () => {
        const data = await discover();
        console.log(data);
        setItems(data);
    };
    return(
      <div>
        <h1>Songs found for you </h1>
        {items.map(item => (
            <h3>
                {item.name}
            </h3>
        )) }
      </div>
    );
}

export default Discover;