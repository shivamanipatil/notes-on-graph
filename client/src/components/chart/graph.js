import React, { useState, useEffect } from "react";
import getTopTags from '../../backend-requests/getTopTags';
import ReactDOM from "react-dom";
import "../../static/css/graph.css";
import styles from '../../static/css/graph.module.css';

import SingleBar from "./singleBar";

const max = 300;

function Graph() {
  const [list, setList] = useState([]);
  const colors = ["#FF6F61", "#6B5B95", "#feb300"];
  useEffect(() => {
    genList();
  }, []);

  const genList = async () => {
    // const list = [];
    // for (let i = 0; i < 5; i++) {
    //   list[i] = Math.random() * 101;
    // }
    const data = await getTopTags();
    const newData = data.slice(0,10);
    setList(newData);
  };
  return (
    <div className={styles.container}>
      <div style={{ display: "flex" }}>
        {list.map(e => {
          const y = max - (max * e.count) / 3976972;
          return (
            <SingleBar
              key={e.count}
              width="80px"
              height="300px"
              color={colors[Math.floor(Math.random() * colors.length)]}
              name={e.tag}
              data={`M 0 ${max} L 0  ${y} L 80 ${y} l 80 ${max} Z`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Graph;