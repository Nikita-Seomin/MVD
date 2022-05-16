import React from 'react';
import {ColElement} from "./ColElement";




export let RowElement = (props) => {
    return (
            <tr> {props.tableCol.map(tre => <ColElement Col={tre.Col} />)}</tr>
    )
}


