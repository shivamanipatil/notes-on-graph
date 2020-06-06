import React, {useState} from 'react';
import styles from '../../static/css/searchhome.module.css';
import { useHistory } from "react-router-dom";

const SearchHome = () => {
    const history = useHistory();
    return (
        <div className={styles.container}>
        <div className={styles.divClass}>
            <h1 className={styles.fontClassh1}>
                Select an option
            </h1>
            <button className={styles.button} onClick={() => history.push("/search/artist")}>Search Artist</button>
            <button className={styles.button} onClick={() => history.push("/search/song")}>Search Songs</button>
            <button className={styles.button} onClick={() => history.push("/similar/artist")}>Find Similar Artist</button> 
        </div>
        </div>
    )
}

export default SearchHome;