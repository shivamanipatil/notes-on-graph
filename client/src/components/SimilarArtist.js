import React, {useState, useEffect} from 'react';
import similarArtist from '../backend-requests/similarArtists';
import queryString from 'query-string';
import styles from '../static/css/similarartist.module.css';

function Tree({ items, depth = 0 }) {
  // our base case, if we have no items, render nothing.
  const [artist, setArtist] = useState([]);
  useEffect(() => {
    if(depth === 2) {
      setArtist(items);
    } else {
      fetchItems();
    } 
  }, [])
  
  const fetchItems = async () => {
    const modifiedItems = await Promise.all(items.map(async (item) => {
      const children = await similarArtist(item.artist, 3);
      const modifiedChildren = children.map((child) => {
          return {
            artist: child,
            children: []
          }
      });
      return {
        artist: item.artist,
        children: modifiedChildren
      }
    }));
    setArtist(modifiedItems);
  } 

  if (!items || !items.length) {
    return null;
  }
  return artist.map(item => (
      <React.Fragment key={item.artist}>
        <div style={{ paddingLeft: depth * 25 }}>  
          <p className={styles.fontClassh3}>{item.artist}</p>
        </div>
        {/* And here's the recursion! */}
          <Tree items={item.children} depth={depth + 1} />
        
      </React.Fragment>
    ));
  
}

const SimilarArtist = ({location}) => {
  const [items, setItems] = useState([]);
  useEffect(() => {
      fetchItems();
  }, []);
  
  const fetchItems = async () => {
      const values = queryString.parse(location.search);
      const data = await similarArtist(values.name, values.limit);
      const newData = data.map((item) => {
        return {
          artist: item
        }
      })
      setItems(newData);
  };
  return (
    <div className={styles.divClass}>
      {items.length > 0 ?
        <Tree items={items} depth={0} />
        : null
      }
      
    </div> 
  );
}

export default SimilarArtist;