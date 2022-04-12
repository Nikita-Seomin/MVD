import './App.css';
import DynamicRequestsTable from "./Components/RequestTable/DynamicRequestsTable";
import {BrowserRouter, Route} from "react-router-dom";
import {Routes} from "react-router";
import Navigation from "./Components/NavigationPage/Navigation";

function App(props) {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path='' element={ <Navigation/> } />
                    <Route path='/requestsTable' element={<DynamicRequestsTable tableRows={props.state.tableData.tableRows } />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
