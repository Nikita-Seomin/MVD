import React, {useEffect, useMemo} from 'react';
import {useState} from 'react/cjs/react.development';
import {useTable, useSortBy} from "react-table";
import classes from './ReqTable.module.css'


// const data = [
//     {
//         whoSentCUSP: 22,
//         WhoSentCUSPDate: 1234
//     },
//     {
//         whoSentCUSP: 22,
//         WhoSentCUSPDate: 1234
//     },
//     {
//         whoSentCUSP: 22,
//         WhoSentCUSPDate: 1234
//     },
//     {
//     }
// ]


export const DynamicRequestsTable = (props) => {
    console.log('reqTable')
    const [changeState, setChangeState] = useState({
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
        requestToDate: ''
    });
    const [editingRowInd, setEditingRow] = useState(null);
    const [data, setContent] = useState(props.data);

    let a = 0;
    //console.log(changeState)


    const COLUMNS_GROUP = [
        {
            Header: 'Номер по порядку',
            id: 'idReqTable',
            accessor: () => {
                a = a + 1;
                return a
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
                        id: 'whoSentCUSPDate',
                        accessor: (originalRow, rowIndex) => {
                            if (editingRowInd === rowIndex) {
                                return <input value={changeState.WhoSentCUSPDate}
                                              onChange={(e) => {
                                                  setChangeState({...changeState, WhoSentCUSPDate: e.target.value})
                                              }}/>
                            }
                            return originalRow.WhoSentCUSPDate
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
                                return <input value={changeState.letterSentDate}
                                              onChange={(e) => {
                                                  setChangeState({...changeState, letterSentDate: e.target.value})
                                              }}/>
                            }
                            return originalRow.letterSentDate
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
                                              }}/>
                            }
                            return originalRow.dataSentOnRegistryDate
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
                                return <input value={changeState.requestToNum}
                                              onChange={(e) => {setChangeState({...changeState, requestToNum: e.target.value})}}/>
                            }
                            return originalRow.requestToDate
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
                        setEditingRow(null);
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
    const columns = useMemo(() => COLUMNS_GROUP, [editingRowInd, changeState])


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







