import React from "react";
import {NavLink} from "react-router-dom";

const Navigation = (props) => {
    let id = 0;
    return (<>
        {props.rows.map(row => {
           return <NavLink to={'/responseTable'} state={row} >
               {row.idRequestTable}--------
           </NavLink>
        })}
    </>)
}

export default Navigation