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
        {items.map(item => (
            <h2>
                {item.name}
            </h2>
        )) }
      </div>
    );
}

export default Discover;