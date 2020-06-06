import React, {useState, useEffect} from 'react';
import similarArtists from '../backend-requests/similarArtists';
import {Link} from 'react-router-dom';

function SearchArtist() {
    const [items, setItems] = useState([[]]);
    const [click, setClick] = useState(true);
    const [click2, setClick2] = useState(true);  
    const [artist, setArtist] = useState('');
    const [limit, setLimit] = useState(3);
     
    useEffect(() => {
        fetchItems(artist, limit);
    }, [click]);
    
    useEffect(() => {
      
    }, [click2])
    
   
    const fetchItems = async (artist, limit) => {
        const data = await similarArtists(artist, limit);
        const newData =  data.map(x => [x])
        setItems(newData);
    };
    
    const clickArtist = async (item, index) => {
        const data = await similarArtists(item[0], 5)
        setItems([...items, items[index].push(data)])
    }
       
    return(
      <div>
        <form onSubmit={(e) => {e.preventDefault();setClick(!click)}}>
          <div className="form-input">
            <input 
              type="text"
              name="artist"
              placeholder="Artist"
              value={artist}
              onChange={(e) => {setArtist(e.target.value);console.log(artist)}}
            />
            <input 
              type="number"
              name="limit"
              placeholder="Number of results"
              value={limit}
              onChange={(e) => {setLimit(e.target.value);console.log(limit)}}
            />
          </div>
          <button>Search</button>
        </form>
        <div>
            {
            items.map((item, index) => (
                <p onClick={() => {clickArtist(item, index);setClick2(!click2)}}>{item[0]}</p>
            )) 
            }
            {
            items.map((item, index) => (
                <div>
                  {
                    Array.from(item).slice(1,).map((art) => (
                      <p>{art}</p>
                    ))
                  }
                </div>
            )) 
            }
        </div>
      </div>
    );
}

export default SearchArtist;