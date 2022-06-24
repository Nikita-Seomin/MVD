// import React, {useEffect} from 'react';
// import  {requestTableRows} from "../../AxiosAPI/requestTableRow";
// import  {regions} from "../../AxiosAPI/Regions";
// import {RequestsTable} from "./RequestsTable";
// import {useState} from "react/cjs/react.development";
//
//
// function OnLoadingReqTableData(Component) {
//     return function LoadingReqTableData({ isLoading, ...props }) {
//         console.log('loading component')
//         if (!isLoading) return <Component {...props} />
//
//         else return (
//             <div>
//                 <h1>Подождите, данные загружаются!</h1>
//             </div>
//         )
//     }
// }
//
//
// const ResponseTableContainer = () => {
//
//     const [containerState, setContainerState] = useState({
//         loading: false,
//         rows: [],
//     })
//     const [isUpdate, setIsUpdate] = useState(false);             //it is necessary for update rows in request table; useEffect keep track this state and do rerender if it changes
//
//     const DataLoading =  OnLoadingReqTableData(RequestsTable);
//
//     useEffect(
//         () => {
//             setContainerState({loading: true})
//             requestTableRows.getRows('root').then(Data => {
//                 for (let i = 0; i < Data.length; ++i ) {
//                     let date = new Date( Date.parse(Data[i]['WhoSentCUSPDate']));
//                     Data[i]['WhoSentCUSPDate'] =
//                         `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`; //create string yyyy-mm-dd with nulls before single-digit numbers
//
//                     date = new Date( Date.parse(Data[i]['letterSentDate']));
//                     Data[i]['letterSentDate'] =
//                         `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
//
//                     date = new Date( Date.parse(Data[i]['dataSentOnRegistryDate']));
//                     Data[i]['dataSentOnRegistryDate'] =
//                         `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
//
//                     date = new Date( Date.parse(Data[i]['requestToDate']));
//                     Data[i]['requestToDate'] =
//                         `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
//                 }
//                 setContainerState({
//                     loading: false,
//                     rows: Data
//                 });
//             })
//         },
//         [setContainerState, isUpdate]);
//
//     return < DataLoading regions={regionsState}
//                          deleteRow={deleteRow}
//                          addRow={addRow}
//                          updateRow={updateRow}
//                          isLoading={containerState.loading}
//                          data={containerState.rows} />
// }
//
// export default ResponseTableContainer