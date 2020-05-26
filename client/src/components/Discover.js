import React, {useState, useEffect} from 'react';
import discover from '../backend-requests/likeSong';
import likeSong from '../backend-requests/discoverSongs';


function Discover() {
    
    useEffect(() => {
        fetchItems();
    }, []);
    
    const [items, setItems] = useState([]); 
    const fetchItems = async () => {
        const data = await discover();
        setItems(data);
    };
    const like = async (track) => {
        try {
            await likeSong(track);
            alert('Song liked')
        } catch(e) {
            alert('Song not found')
        }
    }
    return(
      <div>
        <h4>Songs found for you </h4>
        <p>Click to like the song</p>
        {items.map(item => (
            <h3 onClick={() => like(item.name)}>
                {item.name} 
            </h3>
        )) }
      </div>
    );
}

export default Discover;