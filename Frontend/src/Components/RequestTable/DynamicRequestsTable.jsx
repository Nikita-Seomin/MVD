import React, {useMemo} from 'react';
import {useState} from 'react/cjs/react.development';
import {useTable, useSortBy} from "react-table";
//import {COLUMNS_GROUP, COLUMNS} from "./DynamicTableElements/ColElement";
import classes from './ReqTable.module.css'


const DATA = [
    {
        ReqCUSPNum: 22,
        ReqCUSPData: 1234
    },
    {
        ReqCUSPNum: 22,
        ReqCUSPData: 1234
    },
    {
        ReqCUSPNum: 22,
        ReqCUSPData: 1234
    },
    {
    }
]


export const DynamicRequestsTable = () => {
    const [data, setData] = React.useState(DATA);


    const [editingRow, setEditingRow] = useState(Array(data.length).fill({ id: false} )); //требуется ререндер для обновления
    //console.log(editingRow);
    //console.log(editingRow[0]);

    const COLUMNS_GROUP = [
        {
            Header: 'Номер по порядку',
            accessor: 'idReqTable'
        },
        {
            Header: 'Кусп направившего территориального округа',
            accessor: 'ReqCUSP',

            columns:
                [
                    {Header: '№', accessor: 'ReqCUSPNum'},
                    {Header: 'дата', accessor: 'ReqCUSPData'}
                ]
        },
        {
            Header: 'Субъект РФ',
            accessor: 'Region'
        },
        {
            Header: 'Территориальный округ (подразделение), в который направлен матерал проверки',
            accessor: 'DivisionWhere'
        },
        {
            Header: '№ талона-уведомления (по территориальности)',
            accessor: 'couponNum'
        },
        {
            Header: 'Сопроводительное письмо к материалу отправленному по территориальности',
            accessor: 'reqLetter',
            columns:
                [
                    {Header: '№', accessor: 'reqLetter№'},
                    {Header: 'дата', accessor: 'reqLetterData'}
                ]
        },
        {
            Header: 'Дата отправки по реестру подразделения ДиР',
            accessor: 'dataReqOnRegistry',
            columns:
                [
                    {Header: '№ реестра', accessor: 'dataReqOnRegistry№'},
                    {Header: 'дата', accessor: 'dataReqOnRegistryData'}
                ]
        },
        {
            Header: 'В территориальный орган (подразделение) направлен запрос',
            accessor: 'RequestTo',
            columns:
                [
                    {Header: 'исходный №', accessor: 'RequestTo№'},
                    {
                        Header: 'дата',
                        id: 'RequestToData',
                        //accessor: 'RequestToData',
                        accessor: (originalRow, rowIndex) => {
                                //console.log(editingRow[row.idReqTable]);
                                if (editingRow[rowIndex].id) {
                                    return <input/>
                                }
                                return rowIndex
                        }
                    }
                ]
        },
        {
            Header: "Изменить",
            accessor: (originalRow, rowIndex) => {
                const onClick = () => {
                    let newEditingRow = [...editingRow];
                    newEditingRow[rowIndex] = {id: true};
                    setEditingRow(newEditingRow)
                }

                return (<>
                <button onClick={onClick}>
                    edit
                </button>
                    </>
                )
            }
        }
    ]
    const columns = useMemo(() => COLUMNS_GROUP, [editingRow])


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
        useSortBy,
    )

    return (<>
        <table {...getTableProps()}>
            <thead>
            {headerGroups.map((headerGroups) => (
                <tr {...headerGroups.getHeaderGroupProps()}>
                    {headerGroups.headers.map((column) => (
                        <th{...column.getHeaderProps(column.getSortByToggleProps())}>
                            {column.render('Header')}
                            <span>
                                {column.isSorted ? (column.isSortedDesc ? '🔽' : '🔼') : ''}
                            </span>
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







