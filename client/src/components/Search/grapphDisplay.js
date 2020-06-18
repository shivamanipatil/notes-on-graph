
import Graph from "react-graph-vis";
import React, {useState, useEffect} from 'react';
import similarArtist from '../../backend-requests/similarArtists';
import queryString from 'query-string';

const useForceUpdate = () => useState()[1];

const graph = {
  nodes: [
    { id: 1, label: "drake", color: "#e04141" },

  ],
  edges: []
};

const options = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000"
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
      { id: 1, label: queryString.parse(location.search).name, color: "#e04141" },
  
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
      console.log(values)
      const data = await similarArtist(values.name, 6);
      console.log(data)
      const graphTest = items
      const num = items.nodes.length
      const newData = data.map((item, index) => {
        graphTest.nodes.push({id:index+num+1, label:item, color: "#e04141"})
        graphTest.edges.push({ from: 1, to: index+num+1})
        console.log(item)
        return {
          artist: item
        }
      })
      const newObj = {...graphTest, cha1nged: 'dafsd'};
      console.log(graphTest)
      setF(true);
      setItems(newObj)
  };
  
  const getArtist = (artistIndex) => {
    console.log(items.nodes, artistIndex)
    const artist = items.nodes.filter((item) => {
      return item.id === artistIndex
    })
    console.log(artist)
    return artist[0].label
  }
  const onClickArtist = async (artistIndex) => {
    const artist = getArtist(artistIndex)
    const data = await similarArtist(artist, 3)
    const graphTest = items
    const num = items.nodes.length
    const newData = data.map((item, index) => {
      graphTest.nodes.push({id:index+1+num, label:item, color: "#e04141"})
      graphTest.edges.push({ from: artistIndex, to: index+1+num })
      return {
        artist: item
      }
    })
    const newObj = {...graphTest};
    console.log(Object.is(newObj, graphTest))
    setItems(newObj)
    setKey(newKey + 1);
  }
  const forceUpdate = useForceUpdate();
    return(
        <div>
        {finished ?
          <Graph key={newKey} graph={items} options={options} events={events} style={{ height: "900px" }} />
        :null
        }
        </div>
    );
}

export default GraphDisplay;
