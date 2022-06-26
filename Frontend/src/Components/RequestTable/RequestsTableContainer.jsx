import {requestTableRows} from "../../AxiosAPI/requestTableRow";
import {regions} from "../../AxiosAPI/Regions";
import {RequestsTable} from "./RequestsTable";
import {useState} from "react/cjs/react.development";
import {useEffect} from "react";


const RequestsTableContainer = () => {

    const [containerState, setContainerState] = useState({
        loading: false,
        rows: [],
    })
    const [regionsState, setRegionsState] = useState([]);


    const didUpdate = () => {
        console.log('useEffect')
        setContainerState({loading: true})
        requestTableRows.getRows('root').then(Data => {
            for (let i = 0; i < Data.length; ++i) {
                Data[i]['WhoSentCUSPDate'] = new Date(Data[i]['WhoSentCUSPDate']).format('yyyy-mm-dd'); //create string yyyy-mm-dd with nulls before single-digit numbers
                Data[i]['letterSentDate'] = new Date(Data[i]['letterSentDate']).format('yyyy-mm-dd');
                Data[i]['dataSentOnRegistryDate'] = new Date(Data[i]['dataSentOnRegistryDate']).format('yyyy-mm-dd');
                Data[i]['requestToDate'] = new Date(Data[i]['requestToDate']).format('yyyy-mm-dd');
            }
            setContainerState({
                loading: false,
                rows: Data
            });
        })
    }

    const updateRow = (rowJsonData) => {
        requestTableRows.updateRows(rowJsonData).then(
            didUpdate
        )
    }

    const addRow = (newRowJson) => {
        requestTableRows.postRows(newRowJson).then(
            didUpdate
        )
    }

    const deleteRow = idRowInBD => {
        requestTableRows.deleteRow(idRowInBD).then(
            didUpdate
        )
    }

    const getRegions = () => {
        regions.getRegions().then(data => {
            setRegionsState(data);
        })
    }


    useEffect(          // this use effect only using when creating object for the first time
        () => {
            getRegions();
        }, [])

    useEffect(
        didUpdate,
        [setContainerState]);

    if (!containerState.loading)
        return <RequestsTable regions={regionsState}
                              deleteRow={deleteRow}
                              addRow={addRow}
                              updateRow={updateRow}
                              data={containerState.rows}/>
    else return <h1>Подождите, данные загружаются!</h1>
}

export default RequestsTableContainer