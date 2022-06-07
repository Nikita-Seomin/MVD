import React from 'react';
import {Route} from "react-router-dom";
import {Routes} from "react-router";
import AuthContainer from "./Components/LoginPage/AuthContainer";
import Navigation from "./Components/NavigationPage/Navigation";
import DynamicRequestsTableContainer from "./Components/RequestTable/DynamicRequestsTableContainer";

const App = () => {
    return (
            <div>
                <Routes>
                    <Route path='/Auth' element={ <AuthContainer /> } />
                    <Route path='' element={ <Navigation/> } />
                    <Route path='/requestsTable' element={<DynamicRequestsTableContainer  />} />
                </Routes>
            </div>
    );
}

export default App;
