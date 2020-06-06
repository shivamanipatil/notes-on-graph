import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import styles from '../static/css/nav.module.css';

function Nav() {
    return(
        <nav>
            <h3 className={styles.classH3}>Notes On Graph</h3>
            <ul className="nav-links">
                <Link className={styles.navStyle} to='/home'>
                    <li>Home</li>
                </Link>
                <Link className={styles.navStyle} to='/discover'>
                    <li>Discover</li>
                </Link>
                <Link className={styles.navStyle} to='/search'>
                    <li>Search</li>
                </Link>
                <Link className={styles.navStyle} to='/profile'>
                    <li>Profile</li>
                </Link>
                <Link className={styles.navStyle} to='/logout'>
                    <li>Log out</li> 
                </Link>
            </ul>
        </nav>
    );
}

export default Nav;