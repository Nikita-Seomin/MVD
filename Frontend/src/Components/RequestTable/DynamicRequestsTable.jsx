import React, {useEffect, useMemo} from 'react';
import {useState} from 'react/cjs/react.development';
import {useTable, useSortBy} from "react-table";
import classes from './ReqTable.module.css'
import Calendar from 'react-input-calendar'


const state = {
    idRequestTable: '',             // this field get from request, it does not use, but it is necessary for response
    whoSentCUSP: '',
    WhoSentCUSPDate: '',
    region: '',
    whereSent: '',
    couponNum: '',
    letterSent: '',
    letterSentDate: '',
    dataSentOnRegistryDate: '',
    dataSentOnRegistryNum: '',
    requestToNum: '',
    requestToDate: '',
    answerOnRequest: '',         // this field get from request, it does not use, but it is necessary for response
    owner: '',                   // this field get from request, it does not use, but it is necessary for response
    ResponseTable: ''           // this field get from request, it does not use, but it is necessary for response
}


export const DynamicRequestsTable = (props) => {
    console.log('reqTable')
    const [changeState, setChangeState] = useState(state);
    const [editingRowInd, setEditingRow] = useState(null);
    const [data, setContent] = useState(props.data);
    const [isNewRow, setNewRow] = useState(false);


    let rowNum = 0;
    //console.log(changeState)


    const COLUMNS_GROUP = [
        {
            Header: 'Номер по порядку',
            id: 'idReqTable',
            accessor: () => {
                rowNum = rowNum + 1;
                return rowNum
            }
        },
        {
            Header: 'Кусп направившего территориального округа',
            accessor: 'ReqCUSP',

            columns:
                [
                    {
                        Header: '№',
                        id: 'whoSentCUSP',
                        accessor: (originalRow, rowIndex) => {
                            if (editingRowInd === rowIndex) {
                                return <input value={changeState.whoSentCUSP}
                                              onChange={(e) => {
                                                  setChangeState({...changeState,whoSentCUSP: e.target.value})
                                              }}/>
                            }
                            return originalRow.whoSentCUSP
                        }

                    },
                    {
                        Header: 'дата',
                        id: 'WhoSentCUSPDate',
                        accessor: (originalRow, rowIndex) => {
                            if (editingRowInd === rowIndex) {
                                return <input value={changeState.WhoSentCUSPDate}
                                              onChange={(e) => {
                                                  setChangeState({...changeState, WhoSentCUSPDate: e.target.value})
                                              }}
                                              type="date"/>
                            }
                            let t = originalRow.WhoSentCUSPDate.split('-')          // Split for reverse date from 2000-01-01 to 01-01-2000
                            return `${t[2]}-${t[1]}-${t[0]}`
                        }
                    }
                ]
        },
        {
            Header: 'Субъект РФ',
            id: 'region',
            accessor: (originalRow, rowIndex) => {
                if (editingRowInd === rowIndex) {
                    return <input value={changeState.region}
                                  onChange={(e) => {
                                      setChangeState({...changeState, region: e.target.value})
                                  }}/>
                }
                return originalRow.region
            }
        },
        {
            Header: 'Территориальный округ (подразделение), в который направлен матерал проверки',
            id: 'whereSent',
            accessor: (originalRow, rowIndex) => {
                if (editingRowInd === rowIndex) {
                    return <input value={changeState.whereSent}
                                  onChange={(e) => {
                                      setChangeState({...changeState, whereSent: e.target.value})
                                  }}/>
                }
                return originalRow.whereSent
            }
        },
        {
            Header: '№ талона-уведомления (по территориальности)',
            id: 'couponNum',
            accessor: (originalRow, rowIndex) => {
                if (editingRowInd === rowIndex) {
                    return <input value={changeState.couponNum}
                                  onChange={(e) => {
                                      setChangeState({...changeState, couponNum: e.target.value})
                                  }}/>
                }
                return originalRow.couponNum
            }
        },
        {
            Header: 'Сопроводительное письмо к материалу отправленному по территориальности',
            accessor: 'reqLetter',
            columns:
                [
                    {
                        Header: '№',
                        id: 'letterSent',
                        accessor: (originalRow, rowIndex) => {
                            if (editingRowInd === rowIndex) {
                                return <input value={changeState.letterSent}
                                              onChange={(e) => {
                                                  setChangeState({...changeState, letterSent: e.target.value})
                                              }}/>
                            }
                            return originalRow.letterSent
                        }
                    },
                    {
                        Header: 'дата',
                        id: 'letterSentDate',
                        accessor: (originalRow, rowIndex) => {
                            if (editingRowInd === rowIndex) {
                                console.log(changeState.letterSentDate)
                                return <input value={changeState.letterSentDate}
                                              onChange={(e) => {
                                                  setChangeState({...changeState, letterSentDate: e.target.value})
                                              }}
                                              type="date"/>
                            }
                            let t = originalRow.letterSentDate.split('-')          // Split for reverse date from 2000-01-01 to 01-01-2000
                            return `${t[2]}-${t[1]}-${t[0]}`
                        }
                    }
                ]
        },
        {
            Header: 'Дата отправки по реестру подразделения ДиР',
            accessor: 'dataReqOnRegistry',
            columns:
                [
                    {
                        Header: '№ реестра',
                        id: 'dataSentOnRegistryNum',
                        accessor: (originalRow, rowIndex) => {
                            if (editingRowInd === rowIndex) {
                                return <input value={changeState.dataSentOnRegistryNum}
                                              onChange={(e) => {
                                                  setChangeState({...changeState, dataSentOnRegistryNum: e.target.value})
                                              }}/>
                            }
                            return originalRow.dataSentOnRegistryNum
                        }
                    },
                    {
                        Header: 'дата',
                        id: 'dataSentOnRegistryDate',
                        accessor: (originalRow, rowIndex) => {
                            if (editingRowInd === rowIndex) {
                                return <input value={changeState.dataSentOnRegistryDate}
                                              onChange={(e) => {
                                                  setChangeState({...changeState, dataSentOnRegistryDate: e.target.value})
                                              }}
                                              type="date"/>
                            }
                            let t = originalRow.dataSentOnRegistryDate.split('-')          // Split for reverse date from 2000-01-01 to 01-01-2000
                            return `${t[2]}-${t[1]}-${t[0]}`
                        }
                    }
                ]
        },
        {
            Header: 'В территориальный орган (подразделение) направлен запрос',
            accessor: 'RequestTo',
            columns:
                [
                    {
                        Header: 'исходный №',
                        id: 'requestToNum',
                        accessor: (originalRow, rowIndex) => {
                            if (editingRowInd === rowIndex) {
                                return <input value={changeState.requestToNum}
                                              onChange={(e) => {setChangeState({...changeState, requestToNum: e.target.value})}}/>
                            }
                            return originalRow.requestToNum
                        }
                    },
                    {
                        Header: 'дата',
                        id: 'requestToDate',
                        accessor: (originalRow, rowIndex) => {
                            if (editingRowInd === rowIndex) {
                                return <input value={changeState.requestToDate}
                                              onChange={(e) => {
                                                  setChangeState({...changeState, requestToDate: e.target.value})}}
                                              type="date"/>
                            }
                            let t = originalRow.requestToDate.split('-')          // Split for reverse date from 2000-01-01 to 01-01-2000
                            return `${t[2]}-${t[1]}-${t[0]}`
                        }
                    }
                ]
        },
        {
            Header: "Изменить",
            accessor: (originalRow, rowIndex) => {
                const onClickEdit = () => {
                    if (!editingRowInd) {
                        setChangeState(originalRow)
                        setEditingRow(rowIndex);
                    }
                }
                const onClickSave = () => {
                    if (editingRowInd === rowIndex) {
                        if (isNewRow){
                            setNewRow(false);
                            props.addRow(changeState)
                            setChangeState(state);
                            setEditingRow(null);
                        }
                        else{
                            props.updateRow(changeState);
                            setEditingRow(null);
                            setChangeState(state);
                        }
                    }
                }

                return (<>
                        <button onClick={onClickEdit}>
                            edit
                        </button>
                        <button onClick={onClickSave}>
                            save
                        </button>
                    </>
                )
            }
        }
    ]

    const onClickAddButton = () => {
        if (!editingRowInd){
            setNewRow(true)
            setEditingRow(data.length)
            data.push(changeState)
        }

    }

    const columns = useMemo(() => COLUMNS_GROUP, [editingRowInd, changeState, data, isNewRow])


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
            <button onClick={onClickAddButton}>
                Добавить запись
            </button>
        </>
    )

}







