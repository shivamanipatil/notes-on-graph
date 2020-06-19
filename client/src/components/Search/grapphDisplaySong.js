import Graph from "react-graph-vis";
import React, {useState, useEffect} from 'react';
import similarSong from '../../backend-requests/similarSongs';
import queryString from 'query-string';
import styles from '../../static/css/graphDis.module.css';

const useForceUpdate = () => useState()[1];

const colors = ["#202833"]

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#FFFFFF"
  },
  nodes: {
    font: {
      color: "#65FCF0"
    }
    
  }
};

const artists = []

function GraphDisplaySong({location}) {
  const events = {
    select: function(event) {
      var { nodes, edges } = event;
      console.log("Selected nodes:");
      console.log(getArtist(nodes[0]));
      //fetch
      onClickArtist(nodes[0]);
      forceUpdate();
      console.log("Selected edges:");
      console.log(edges);
    }
  };
  const [items, setItems] = useState({
    nodes: [
      { id: 1, label: queryString.parse(location.search).name, color: "#088026" },
  
    ],
    edges: []
  });
  const [finished, setF] = useState(false);
  const [finished1, setF1] = useState(false);
  const [newKey, setKey]= useState(0);
  useEffect(() => {
      fetchItems();
  }, []);
  
  useEffect(() => {
    
  }, [finished1])
  
  const fetchItems = async () => {
      const values = queryString.parse(location.search);
      const data = await similarSong(values.name, values.artist, values.limit);
      const graphTest = items
      const num = items.nodes.length
      const color = colors[ Math.floor(Math.random() * colors.length)]
      console.log(data)
      data.forEach((item, index) => {
        artists.push({id:index+num+1, artist: item.artist})
        graphTest.nodes.push({id:index+num+1, label:item.track, color})
        graphTest.edges.push({ from: 1, to: index+num+1, length: ((Math.floor(Math.random() * (values.limit+1)))*17.5)})
      })
      const newObj = {...graphTest, cha1nged: 'dafsd'};
      setF(true);
      console.log(artists)
      setItems(newObj)
  };
  
  const getArtist = (artistIndex) => {
    const artist = items.nodes.filter((item) => {
      return item.id === artistIndex
    })
    return artist.length > 0 ? artist[0].label : null
  }
  
  const getSongArtist = (artistIndex) => {
    const artist = artists.filter((item) => {
      return item.id === artistIndex
    })
    return artist.length > 0 ? artist[0].artist : null
  }
  const onClickArtist = async (artistIndex) => {
    console.log(artistIndex)
    const artist = getArtist(artistIndex)
    const artistName = getSongArtist(artistIndex)
    console.log(artist, artistName)
    const data = await similarSong(artist,artistName, 3)
    const graphTest = items
    const num = items.nodes.length
    const color = colors[ Math.floor(Math.random() * colors.length)]
    data.forEach((item, index) => {
      artists.push({id:index+num+1, artist: item.artist})
      graphTest.nodes.push({id:index+1+num, label:item.track, color})
      graphTest.edges.push({ from: artistIndex, to: index+1+num })
    })
    const newObj = {...graphTest};
    console.log(Object.is(newObj, graphTest))
    setItems(newObj)
    setKey(newKey + 1);
  }
  const forceUpdate = useForceUpdate();
    return(
        <div className={styles.graph}>
        {finished ?
          <Graph key={newKey} graph={items} options={options} events={events} style={{ height: "1100px" }} />
        :null
        }
        </div>
    );
}

export default GraphDisplaySong;
