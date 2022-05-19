import React, {useMemo} from 'react';
import {useTable} from "react-table";
import {COLUMNS_GROUP} from "./DynamicTableElements/ColElement";
import classes from './ReqTable.module.css'



const DATA = [

]




export const DynamicRequestsTable = () => {

    const columns = useMemo(() => COLUMNS_GROUP, [])
    const data = useMemo(() => DATA, [])

    const reqTable = useTable({
        columns,
        data
    })

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = reqTable

    return (
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map((headerGroups) => (
                <tr {...headerGroups.getHeaderGroupProps()}>
                    {headerGroups.headers.map((column) => (
                        <th{...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                </tr>
            ))}

            </thead>
            <tbody {...getTableBodyProps}>
            { rows.map(row => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                        </tr>
                    )
                })
            }

            </tbody>

        </table>
    )

}



