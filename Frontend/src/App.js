import React from 'react';
import {Route} from "react-router-dom";
import {Routes} from "react-router";
import state from "./Data/data";
import AuthContainer from "./Components/LoginPage/AuthContainer";
import Navigation from "./Components/NavigationPage/Navigation";
import DynamicRequestsTable from "./Components/RequestTable/DynamicRequestsTable";

const App = () => {
    return (
            <div>
                <Routes>
                    <Route path='/Auth' element={ <AuthContainer /> } />
                    <Route path='' element={ <Navigation/> } />
                    <Route path='/requestsTable' element={<DynamicRequestsTable tableRows={state.tableData.tableRows } />} />
                </Routes>
            </div>
    );
}

export default App;
