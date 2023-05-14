import React from 'react';
import './App.css';
import TimesheetTable from "./component/TimesheetTable";
import {Navigation} from "./component/Navigation";
import {Route, Routes} from "react-router-dom";
import {Dashboard} from "./component/Dashboard";

const issues = [
    {
        id: '1',
        title: 'Issue 1',
    },
    {
        id: '2',
        title: 'Issue 2',
    },
    {
        id: '3',
        title: 'Issue 3',
    },
];

const timeEntries = [
    {
        issueId: '1',
        date: new Date(2023, 3, 1),
        timeSpent: 7200,
    },
    {
        issueId: '1',
        date: new Date(2023, 3, 2),
        timeSpent: 10800,
    },
    {
        issueId: '2',
        date: new Date(2023, 3, 1),
        timeSpent: 14400,
    },
    {
        issueId: '2',
        date: new Date(2023, 3, 3),
        timeSpent: 7200,
    },
    {
        issueId: '3',
        date: new Date(2023, 3, 2),
        timeSpent: 18000,
    },
];

function App() {
    return (
        <div>
            <Navigation/>
            <Routes>
                <Route path="/timesheet" element={<TimesheetTable issues={issues} timeEntries={timeEntries}/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </div>
    );
}

export default App;
