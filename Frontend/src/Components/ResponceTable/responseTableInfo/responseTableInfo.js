import React from "react";
import {useState} from 'react/cjs/react.development';
import {useFlexLayout, useResizeColumns, useTable} from "react-table";
import columns from './columns'
import classes from "../../RequestTable/ReqTable.module.css";

export const RequestsTableInfo = (props) => {
    //props.row.WhoSentCUSPDate='20/01/2002'
    const [data, setData] = useState([props.row]);
    console.log(data)

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







