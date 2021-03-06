import Graph from "react-graph-vis";
import React, {useState, useEffect} from 'react';
import similarArtist from '../../backend-requests/similarArtists';
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
    color: {
      border: "#65FCF0",
      background: "#202833"
    },
    font: {
      color: "#65FCF0",
      size: 24,
    },
    borderWidth: 2,
    borderWidthSelected: 4
  }
};

function GraphDisplay({location}) {
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
      const data = await similarArtist(values.name, values.limit);
      const graphTest = items
      const num = items.nodes.length
      const color = colors[ Math.floor(Math.random() * colors.length)]
      data.forEach((item, index) => {
        graphTest.nodes.push({id:index+num+1, label:item, color})
        graphTest.edges.push({ from: 1, to: index+num+1})
      })
      const newObj = {...graphTest, cha1nged: 'dafsd'};
      setF(true);
      setItems(newObj)
  };
  
  const getArtist = (artistIndex) => {
    const artist = items.nodes.filter((item) => {
      return item.id === artistIndex
    })
    return artist.length > 0 ? artist[0].label : null
  }
  const onClickArtist = async (artistIndex) => {
    const values = queryString.parse(location.search);
    const artist = getArtist(artistIndex)
    const data = await similarArtist(artist, values.limit)
    const graphTest = items
    const num = items.nodes.length
    const color = colors[ Math.floor(Math.random() * colors.length)]
    data.forEach((item, index) => {
      graphTest.nodes.push({id:index+1+num, label:item, color})
      graphTest.edges.push({ from: artistIndex, to: index+1+num, length: ((Math.floor(Math.random() * (values.limit+1)))*17.5)})
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
          <Graph key={newKey} graph={items} options={options} events={events} style={{ height: "900px" }} />
        :null
        }
        </div>
    );
}

export default GraphDisplay;
