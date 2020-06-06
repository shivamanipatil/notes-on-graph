import React, {useState, useEffect} from 'react';
import songsFromTag from '../backend-requests/songFromTags';
import artistsFromTag from '../backend-requests/artistsfromTags';
import styles from '../static/css/songtag.module.css';
import likeSong from '../backend-requests/likesong';

const SongsFromTag = ({match}) => {
    useEffect(() => {
        fetchSongs();
        fetchArtists();
    }, []);
    
    const [songs, setSongs] = useState([]);
    const [artists, setArtists] = useState([]); 
    const fetchSongs = async () => {
        const dataSongs = await songsFromTag(match.params.tag);
        setSongs(dataSongs);
    };
    const fetchArtists = async () => {
        const dataArtists = await songsFromTag(match.params.tag);
        setArtists(dataArtists);
    };
    const likesong = (name) => {
        try {
            console.log(name);
            likeSong(name);
            alert('Liked')
        } catch(e) {
            console.log('Could not like');   
        }
    };
    return(
      <div className={styles.divClass}>
        <div lassName={styles.col}>
            <h1 className={styles.fontClassh1}>{match.params.tag}</h1>
            <h3 className={styles.subHeading}>- Click <span>&#128156;</span> to add to favourites</h3>            
        </div>
        <div lassName={styles.col}>
            <div className={styles.subcol}>
                <h3 className={styles.subHeading}>Songs</h3>
                {songs.map(item => (
                    <h3 className={styles.fontClassh3}>
                        {item.name} <span onClick={(e) => {likesong(item.name)}}  className={styles.like}>&#128156;</span><br/> - <span className={styles.spanClass}>{item.artist}</span>
                    </h3>
                )) }
            </div>
            <div className={styles.subcol}>
                <h3 className={styles.subHeading}>Artists</h3>
                {artists.map(item => (
                    <h3 className={styles.fontClassh3}>
                        {item.artist} <span onClick={(e) => {likesong(item.name)}}  className={styles.like}>&#128156;</span><br/> - <span className={styles.spanClass}>{item.artist}</span>
                    </h3>
                )) }
            </div>
        </div>
      </div>
    );
}

export default SongsFromTag;