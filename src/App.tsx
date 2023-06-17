import React from 'react';
// import './App.css';
import TimesheetTable from "./component/TimesheetTable";
import {Navigation} from "./component/Navigation";
import {Route, Routes} from "react-router-dom";
import {Dashboard} from "./component/Dashboard";
import {LoginForm} from "./component/LoginForm";

function App() {

    return (
        <div>
            <Navigation/>
            <Routes>
                <Route path="/timesheet" element={<TimesheetTable/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/login" element={<LoginForm/>}/>
            </Routes>
        </div>
    );
}

export default App;
