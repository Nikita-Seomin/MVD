import React, {useEffect} from 'react';
import {requestTableRowsAxiosAPI} from "../../AxiosAPI/AxiosAPI";
import {DynamicRequestsTable} from "./DynamicRequestsTable";
import {useState} from "react/cjs/react.development";


function OnLoadingReqTableData(Component) {
    return function LoadingReqTableData({ isLoading, ...props }) {
        console.log('loading component')
        if (!isLoading) return <Component {...props} />

        else return (
            <div>
                <h1>Подождите, данные загружаются!</h1>
            </div>
        )
    }
}


const DynamicRequestsTableContainer = () => {

    const DataLoading =  OnLoadingReqTableData(DynamicRequestsTable);

    const [containerState, setContainerState] = useState(
        {
            loading: false,
            rows: [],
        }
    )

    useEffect(
        () => {
            console.log('useEffect')
        setContainerState({loading: true})
        requestTableRowsAxiosAPI.getRows('root').then(Data => {
            setContainerState({
                loading: false,
                rows: Data
            })
        })
    },
        [setContainerState]);

        return < DataLoading isLoading={containerState.loading} data={containerState.rows} />
}

export default DynamicRequestsTableContainer