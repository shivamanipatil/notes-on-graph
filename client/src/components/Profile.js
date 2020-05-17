import React, {useState, useEffect} from 'react';
import profile from '../backend-requests/getProfile';

function Profile() {
        
    useEffect(() => {
        getResult();
    }, []);
    const [user, setUser] = useState({empty: true});
    const getResult = async () => {
        const result = await profile();
        setUser(result);
    };
    
    return(
        <div>
            <h2>{user.name}</h2>
            <h2>{user.email}</h2>
            <div>
                <h1>Favourite Artists</h1>
                {!user.empty?
                user.favouriteArtists.map((artist) => (
                    <h3>{artist.artist}</h3>
                ))
                :null
                }                  
            </div>
            <div>
                <h1>Favourite Songs</h1>
                {!user.empty?
                user.favouriteSongs.map((song) => (
                    <h3>{song.track} By {song.artist}</h3>
                ))
                :null
                }                  
            </div>
        </div>
    );
}

export default Profile;