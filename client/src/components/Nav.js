import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

function Nav() {
    const navStyle = {
        'color': 'white',
        'text-decoration': 'none',    
    };
    return(
        <nav>
            <h3>Notes on graph</h3>
            <ul className="nav-links">
                <Link style={navStyle} to='/home'>
                    <li>Home</li>
                </Link>
                <Link style={navStyle} to='/discover'>
                    <li>Discover</li>
                </Link>
                <Link style={navStyle} to='/search/artist'>
                    <li>Search-Artist</li>
                </Link>
                <Link style={navStyle} to='/profile'>
                    <li>Profile</li>
                </Link>
                <Link style={navStyle} to='/logout'>
                    <li>Log out</li> 
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;