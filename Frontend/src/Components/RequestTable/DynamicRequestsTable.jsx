import React from 'react';
import {RowElement} from "./DynamicTableElements/RowElement";


const DynamicRequestsTable = (props) => {

    let rowElements = props.tableRows.map(tre => <RowElement tableCol={tre.tableCol} />);

    return (
        <div>
            <table id="dynamic" width="650" border="1" cellSpacing="0" cellPadding="5">
                <tr>
                    <th scope="col">Поле 1</th>
                    <th scope="col">Поле 2</th>
                    <th scope="col">Поле 3</th>
                    <th scope="col">Поле 4</th>
                    <th scope="col">&nbsp;</th>
                </tr>
                {rowElements}
            </table>
        </div>
    );
}

export default DynamicRequestsTable;

