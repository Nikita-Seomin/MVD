import RequestsTableInfo from  './responseTableInfo/responseTableInfo'
import { useLocation } from "react-router-dom";


export const ResponseTable = (props) => {

    const location = useLocation();
    const { state } = location;
    return ( <RequestsTableInfo row={state}/>
    )
}

export default ResponseTable;







