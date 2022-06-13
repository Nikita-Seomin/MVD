import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './Navigation.module.css';

let Navigation = () => {

    return (
        <nav className={classes.nav}>
            <NavLink to={"/requestsTable"} >qwe</NavLink>
        </nav>
    )
}

export default Navigation;