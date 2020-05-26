import React, {useState, useEffect} from 'react';
import profile from '../backend-requests/getProfile';
import {getJWT} from '../helpers/getJwt';
import styles from '../static/css/profile.module.css'

function Profile() {
        
    useEffect(() => {
        getResult();
    }, []);
    const [user, setUser] = useState({empty: true});
    const getResult = async () => {
        const jwt = getJWT();
        const result = await profile(jwt);
        setUser(result);
    };
    
    return(
        <div className={styles.divClass}>
            <div className={styles.heading}> 
                <h1 className={styles.fontClassh1}>Hi {user.name}</h1>
                <h1 className={styles.fontClass}>{user.email}</h1>
            </div>
            <div className={styles.favs}>
                <div className={styles.favRow}>
                    <h1 className={styles.fontClass}>Favourite Artists</h1>
                    {!user.empty?
                    user.favouriteArtists.map((artist) => (
                        <h3 className={styles.fontClassh3}>{artist.artist}</h3>
                    ))
                    :null
                    }                  
                </div>
                <div className={styles.favRow}>
                    <h1 className={styles.fontClass}>Favourite Songs</h1>
                    {!user.empty?
                    user.favouriteSongs.map((song) => (
                        <h3 className={styles.fontClassh3}>{song.track} By {song.artist}</h3>
                    ))
                    :null
                    }                  
                </div>
            </div>
 
        </div>
    );
}

export default Profile;