import React from 'react';
import {NavLink} from "react-router-dom";

let respLink = () => {

    return (
        <nav>
            <NavLink to={"/requestsTable"} >Перейти на страницу запросо в другие подразделения---------------</NavLink>
        </nav>
    )
}

export default respLink;