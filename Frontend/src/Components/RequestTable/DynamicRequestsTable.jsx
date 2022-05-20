import React, {useMemo} from 'react';
import {useState} from 'react/cjs/react.development';
import {useTable, useSortBy, useRowState} from "react-table";
//import {COLUMNS_GROUP, COLUMNS} from "./DynamicTableElements/ColElement";
import classes from './ReqTable.module.css'
import {Button} from "@material-ui/core";


const DATA = [
    {
        idReqTable: 1,
        ReqCUSPNum: 22,
        ReqCUSPData: 1234
    }
]


export const DynamicRequestsTable = () => {

    const data = useMemo(() => DATA, [])
    const [editingRow, setEditingRow] = useState(false);
    const [dataState, setData] = useState(data);


    const handleClickEditRow = (rowIndex) => {
        setEditingRow[rowIndex](true);
    }
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
                        //accessor: 'RequestToData',
                        accessor: (rowData, rowIndex) => {
                            return (<>
                                    {editingRow ?  (
                                        <input
                                            checked={rowData.status}
                                            onClick={() => {
                                                const tmpData = [...dataState];
                                                tmpData[rowIndex].status = !tmpData[rowIndex].status;
                                                setData(tmpData);
                                            }}
                                        />
                                    ) :
                                        rowData.idReqTable
                                    }
                                </>
                            );
                        }
                    }
                ]
        },
        {
            Header: "Изменить",
            accessor: (_, record) => {

                return (
                    <>
                        <Button onClick={(e) => alert(e.status)}>
                            Edit
                        </Button>
                        <Button type="link" htmlType="submit">
                            Save
                        </Button>
                    </>
                );
            }
        }
    ]

    const columns = useMemo(() => COLUMNS_GROUP, [])


    const onFieldClick = (e) => {
        alert(e.target.value())
    }

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
            columns,
            data,
            initialState: {
                CUSPNum: null,
                CUSPData: null,
                RegionRus: null,
                DivisionWhereSentMaterial: null,
                couponNum: null,
                letterNum: null,
                letterDate: null,
                dateSentOnRegistryNum: null,
                dateSentOnRegistryDate: null,
                requestSentToDivisionNum: null,
                requestSentToDivisionDate: null
            }
        },
        useSortBy,
        useRowState
    )

    return (
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
                            return <td {...cell.getCellProps()}>
                                {cell.render('Cell')}
                            </td>
                        })}
                    </tr>
                )
            })
            }

            </tbody>

        </table>
    )

}







