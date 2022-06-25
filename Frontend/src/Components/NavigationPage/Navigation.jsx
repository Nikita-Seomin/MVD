import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './Navigation.module.css';

let Navigation = () => {

    return (
        <nav >
            <NavLink to={"/requestsTable"} >Перейти на страницу запросо в другие подразделения---------------</NavLink>
            <NavLink to={"/navigationResponseTable"} >Ответить на пришедшие запросы</NavLink>
        </nav>
    )
}

export default Navigation;