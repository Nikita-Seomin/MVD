import React, {useMemo} from 'react';
import {useState} from 'react/cjs/react.development';
import {useTable, useSortBy, useRowState} from "react-table";
//import {COLUMNS_GROUP, COLUMNS} from "./DynamicTableElements/ColElement";
import classes from './ReqTable.module.css'


const DATA = [
    {
        idReqTable: 1,
        ReqCUSPNum: 22,
        ReqCUSPData: 1234
    }
]


export const DynamicRequestsTable = () => {


    const [editingRow, setEditingRow] = useState(false);
    const [data, setData] = React.useState(DATA);




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
                        accessor: 'RequestToData'
                    }
                ]
        },
        {
            Header: "Изменить",
            accessor: '[editButton]',

        }
    ]
    const columns = useMemo(() => COLUMNS_GROUP, [])

    const updateMyData = (rowIndex, columnId, value) => {
        // We also turn on the flag to not reset the page
        setData(old =>
            old.map((row, index) => {
                if (index === rowIndex) {
                    return {
                        ...old[rowIndex],
                        [columnId]: value,
                    }
                }
                return row
            })
        )
    }



    const EditableCell = ({
                              value: initialValue,
                              row: { index },
                              column: { id },
                              updateMyData, // This is a custom function that we supplied to our table instance
                          }) => {
        // We need to keep and update the state of the cell normally
        const [value, setValue] = React.useState(initialValue)

        const onChange = e => {
            setValue(e.target.value)
        }

        // We'll only update the external data when the input is blurred
        const onBlur = () => {
            updateMyData(index, id, value)
        }

        // If the initialValue is changed external, sync it up with our state
        React.useEffect(() => {
            setValue(initialValue)
        }, [initialValue])

        return <input value={value} onChange={onChange} onBlur={onBlur} />
    }

// Set our editable cell renderer as the default Cell renderer
    const defaultColumn = {
        Cell: EditableCell,
    }


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows
    } = useTable({
            columns,
            data,
            defaultColumn,
            updateMyData

        },
        useSortBy,
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
                            return <td {...cell.getCellProps()} >
                                {cell.render('Cell')}
                            </td>
                        })}
                    </tr>
                )
            })}
            </tbody>
        </table>
    )

}







