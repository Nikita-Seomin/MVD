import React, {useMemo} from 'react';
import {useState} from 'react/cjs/react.development';
import {useTable, useResizeColumns, useFlexLayout} from "react-table";
import classes from './respTableAnswer.module.css'
import {respTableAnswer} from "../../../AxiosAPI/RespTableResponse";


const state = {
    idRequestTable: '',
    respLetterNum: '',
    respLetterDate: '',
    respDateSentOnRegistyNum: '',
    respDateSentOnRegistyDate: '',
    whoTakeCUSP: '',
    whoTakeDate: '',
    decisionNum: '',
    decisionDate: ''
}


export const ResponseTableAnswer = (props) => {
    state.idRequestTable = props.row.idRequestTable
    const [changeState, setChangeState] = useState(state);
    let data = [changeState]


    const COLUMNS_GROUP = [
        {
            Header: 'Кусп направившего территориального округа',
            id: 'respLetter',

            columns:
                [
                    {
                        Header: '№',
                        id: 'respLetterNum',
                        accessor: () => {
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
                        accessor: () => {
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
                        accessor: () => {
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
                        accessor: () => {
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
                        accessor: () => {
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
                        accessor: () => {
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
                        accessor: () => {
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
                        accessor: () => {
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
            accessor: () => {
                function onClickSave (){
                    respTableAnswer.postAnswer(changeState).then(stat => {
                        if (stat === 500)
                            alert('Не полуилось загрузить данные')
                        else {
                            return window.location.assign('http://localhost:3000/NavigationResponseTable');
                        }
                    })
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
            </table>
            >
        </>
    )
}







