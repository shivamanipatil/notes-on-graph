import React from "react";
import ReactDOM from "react-dom";
import styles from '../../static/css/graph.module.css';

function SingleBar({ width, height, data, color, name }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: '7px'
      }}
    >
      <div>
      <svg style={{ marginLeft: 5 }} width={width} height={height}>
        <path
          style={{
            animation: "bounce linear 400ms",
            transformOrigin: "50% 100%",
            margin: "auto"
          }}
          d={data}
          fill={color}
        />
       
      </svg></div>
      <div>
      <p className={styles.pText}>{name}</p></div>
    </div>
  );
}

export default SingleBar;