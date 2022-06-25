import React, {useMemo} from 'react';
import {useState} from 'react/cjs/react.development';
import {useTable, useResizeColumns, useFlexLayout} from "react-table";
import classes from './respTableAnswer.module.css'


const state = {
    respLetterNum: '',
    respLetterDate: '',
    respDateSentOnRegistyNum: '',
    respDateSentOnRegistyDate: '',
    whoTakeCUSP: '',
    whoTakeDate: '',
    decisionNum: '',
    decisionDate: ''
}


export const RequestsTable = (props) => {
    console.log('reqTable')
    const [changeState, setChangeState] = useState(state);


    const COLUMNS_GROUP = [
        {
            Header: 'Кусп направившего территориального округа',
            id: 'respLetter',

            columns:
                [
                    {
                        Header: '№',
                        id: 'respLetterNum',
                        accessor: (originalRow, rowIndex) => {
                            return <input className={classes.input}
                                          value={changeState.respLetterNum}
                                          onChange={(e) => {
                                              setChangeState({...changeState, respLetterNum: e.target.value})
                                          }}/>
                        }

                    },
                    {
                        Header: 'дата',
                        id: 'respLetterDate',
                        accessor: (originalRow, rowIndex) => {
                            return <input className={classes.input}
                                          value={changeState.respLetterDate}
                                          onChange={(e) => {
                                              setChangeState({...changeState, respLetterDate: e.target.value})
                                          }}
                                          type="date"/>
                        }
                    }
                ]
        },
        {
            Header: 'Сопроводительное письмо к материалу отправленному по территориальности',
            id: 'respDateSentOnRegisty',
            columns:
                [
                    {
                        Header: '№',
                        id: 'respDateSentOnRegistyNum',
                        accessor: (originalRow, rowIndex) => {
                            return <input className={classes.input}
                                          value={changeState.respDateSentOnRegistyNum}
                                          onChange={(e) => {
                                              setChangeState({...changeState, respDateSentOnRegistyNum: e.target.value})
                                          }}/>
                        }
                    },
                    {
                        Header: 'дата',
                        id: 'respDateSentOnRegistyDate',
                        accessor: (originalRow, rowIndex) => {
                            return <input className={classes.input}
                                          value={changeState.respDateSentOnRegistyDate}
                                          onChange={(e) => {
                                              setChangeState({
                                                  ...changeState,
                                                  respDateSentOnRegistyDate: e.target.value
                                              })
                                          }}
                                          type="date"/>
                        }
                    }
                ]
        },
        {
            Header: 'Дата отправки по реестру подразделения ДиР',
            id: 'whoTake',
            columns:
                [
                    {
                        Header: '№ реестра',
                        id: 'whoTakeCUSP',
                        accessor: (originalRow, rowIndex) => {
                            return <input className={classes.input}
                                          value={changeState.whoTakeCUSP}
                                          onChange={(e) => {
                                              setChangeState({
                                                  ...changeState,
                                                  whoTakeCUSP: e.target.value
                                              })
                                          }}/>
                        }
                    },
                    {
                        Header: 'дата',
                        id: 'whoTakeDate',
                        accessor: (originalRow, rowIndex) => {
                            return <input className={classes.input}
                                          value={changeState.whoTakeDate}
                                          onChange={(e) => {
                                              setChangeState({
                                                  ...changeState,
                                                  whoTakeDate: e.target.value
                                              })
                                          }}
                                          type="date"/>
                        }
                    }
                ]
        },
        {
            Header: 'В территориальный орган (подразделение) направлен запрос',
            id: 'decision',
            columns:
                [
                    {
                        Header: 'исходный №',
                        id: 'decisionNum',
                        accessor: (originalRow, rowIndex) => {
                                return <input className={classes.input}
                                              value={changeState.decisionNum}
                                              onChange={(e) => {
                                                  setChangeState({...changeState, decisionNum: e.target.value})
                                              }}/>

                        }
                    },
                    {
                        Header: 'дата',
                        id: 'decisionDate',
                        accessor: (originalRow, rowIndex) => {
                                return <input className={classes.input}
                                              value={changeState.decisionDate}
                                              onChange={(e) => {
                                                  setChangeState({...changeState, decisionDate: e.target.value})
                                              }}
                                              type="date"/>
                        }
                    }
                ]
        },
        {
            Header: "Сохранить",
            accessor: (originalRow, rowIndex) => {
                const onClickSave = () => {
                            props.addRow(changeState)
                            setChangeState(state);
                }


                return (<>
                        <button onClick={onClickSave}>
                            сохранить
                        </button>
                    </>
                )
            }
        }
    ]

    const columns = useMemo(() => COLUMNS_GROUP, [changeState])
    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 100,
            maxWidth: 300
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows
    } = useTable({
            columns,
            data,
            defaultColumn
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
            </table>>
        </>
    )

}







