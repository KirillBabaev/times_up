import React from 'react';
import TimesheetTable from "./component/TimesheetTable";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Dashboard} from "./component/Dashboard";
import {LoginForm} from "./component/LoginForm";

function App() {

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/timesheet" element={<TimesheetTable/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
