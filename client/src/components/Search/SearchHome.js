import React, {useState} from 'react';
import styles from '../../static/css/searchhome.module.css';
import { useHistory } from "react-router-dom";

const SearchHome = () => {
    const history = useHistory();
    return (
        <div className={styles.container}>
            <img src="https://source.unsplash.com/1100x900/?music,songs,notes,sound"></img>
            <div className={styles.buttonContainer}>
                <button className={styles.button} onClick={() => history.push("/search/artist")}>Search Artist</button><br/>
                <button className={styles.button} onClick={() => history.push("/search/song")}>Search Songs</button><br/>
                <button className={styles.button} onClick={() => history.push("/similar/artist")}>Find Similar Artists</button><br/>
                <button className={styles.button} onClick={() => history.push("/similar/song")}>Find Similar Songs</button><br/> 
            </div>
            
        </div>
    )
}

export default SearchHome;