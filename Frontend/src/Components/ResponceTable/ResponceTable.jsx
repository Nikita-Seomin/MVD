import RequestsTableInfo from  './responseTableInfo/responseTableInfo'
import {ResponseTableAnswer} from './responseTableAnswer/responseTableAnswer'
import { useLocation } from "react-router-dom";


export const ResponseTable = (props) => {

    const location = useLocation();
    const { state } = location;
    return (<>
    <RequestsTableInfo row={state}/>
    <ResponseTableAnswer row={state}/>
    </>)
}

export default ResponseTable;







