import React from 'react';
import {Route} from "react-router-dom";
import {Routes} from "react-router";
import AuthContainer from "./Components/LoginPage/AuthContainer";
import Navigation from "./Components/NavigationPage/Navigation";
import RequestsTableContainer from "./Components/RequestTable/RequestsTableContainer";
import NavigationContainer from "./Components/ResponceTable/Navigation/NavigationContainer";

const App = () => {
    return (
            <div>
                <Routes>
                    <Route path='/Auth' element={ <AuthContainer /> } />
                    <Route path='' element={ <Navigation/> } />
                    <Route path='/requestsTable' element={<RequestsTableContainer />} />
                    <Route path='/navigationResponseTable' element={<NavigationContainer />} />
                </Routes>
            </div>
    );
}

export default App;
