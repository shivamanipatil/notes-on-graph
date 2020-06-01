import React, {useState, useEffect} from 'react';
import profile from '../backend-requests/getProfile';
import {getJWT} from '../helpers/getJwt';
import styles from '../static/css/profile.module.css'
import unlikeArtist from '../backend-requests/unlikeartist';
import unlikeSong from '../backend-requests/unlikesong';

function Profile() {
    const [user, setUser] = useState({empty: true, profile: {}});
    const [click, setClick] = useState(true);  
    useEffect(() => {
        getResult();
    }, []);
    
    
    const unlikeartist = (id) => {
        try {
            console.log(id);
            unlikeArtist(id);
            window.location.reload(false);
        } catch(e) {
            console.log('Could not unlike');   
        }
    };
    const unlikesong = (id) => {
        try {
            console.log(id);
            unlikeSong(id);
            window.location.reload(false);
        } catch(e) {
            console.log('Could not unlike');   
        }
    };
    const getResult = async () => {
        const jwt = getJWT();
        const result = await profile(jwt);
        setUser({changed: false, profile: result});
    };
    
    return(
        <div className={styles.divClass}>
            <div className={styles.heading}> 
                <h1 className={styles.fontClassh1}>Hi {user.profile.name}</h1>
                <h1 className={styles.fontClass}>{user.profile.email}</h1>
                <h3 className={styles.subHeading}> - Click <span>&#128156;</span> to unlike</h3>
            </div>
            <div className={styles.favs}>
                <div className={styles.favRow}>
                    <h1 className={styles.fontClass}>Favourite Artists</h1>
                    {!user.empty?
                        user.profile.favouriteArtists.map((artist) => (
                        <h3 className={styles.fontClassh3} key={artist._id}>
                            {artist.artist} 
                            <span onClick={(e) => {unlikeartist(artist._id)}} className={styles.unlike}>&#128156;</span>
                        </h3>
                    ))
                    :null
                    }                  
                </div>
                <div className={styles.favRow}>
                    <h1 className={styles.fontClass}>Favourite Songs</h1>
                    {!user.empty?
                        user.profile.favouriteSongs.map((song) => (
                        <h3 className={styles.fontClassh3}>
                            {song.track} By {song.artist} 
                            <span onClick={() => {unlikesong(song._id)}} className={styles.unlike}>&#128156;</span>
                        </h3>
                    ))
                    :null
                    }                  
                </div>
            </div>
 
        </div>
    );
}

export default Profile;