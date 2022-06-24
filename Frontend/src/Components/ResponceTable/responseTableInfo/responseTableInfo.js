import React from "react";
import {useState} from 'react/cjs/react.development';
import {useFlexLayout, useResizeColumns, useTable} from "react-table";
import columns from './columns'
import classes from "../../RequestTable/ReqTable.module.css";
import Dddd from 'x-date'

export const RequestsTableInfo = (props) => {
    console.log(props.row)
    props.row.WhoSentCUSPDate = new Date(props.row.WhoSentCUSPDate).format('dd-mm-yyyy');
    props.row.dataSentOnRegistryDate = new Date(props.row.dataSentOnRegistryDate).format('dd-mm-yyyy');
    props.row.letterSentDate = new Date(props.row.letterSentDate).format('dd-mm-yyyy');
    props.row.requestToDate = new Date(props.row.requestToDate).format('dd-mm-yyyy');
    const [data, setData] = useState([props.row]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows
    } = useTable({
            columns,
            data,
        },
        useResizeColumns,
        useFlexLayout
    )
    return (<>
            <table className={classes.Table} {...getTableProps()}>
                <thead>
                {headerGroups.map((headerGroups) => (
                    <tr {...headerGroups.getHeaderGroupProps()}>
                        {headerGroups.headers.map((column) => (
                            <th{...column.getHeaderProps()}>
                                {column.render('Header')}
                                <div
                                    {...column.getResizerProps()}
                                    className={classes.resizer}
                                />
                            </th>
                        ))}
                    </tr>
                ))}

                </thead>
                <tbody {...getTableBodyProps}>
                {rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} >
                            {row.cells.map((cell) => {
                                return <td {...cell.getCellProps()} >
                                    {cell.render('Cell')}
                                </td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </>
    )
}

export default RequestsTableInfo;







