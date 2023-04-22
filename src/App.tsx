import React from 'react';
import logo from './logo.svg';
import './App.css';
import TimesheetTable from "./component/TimesheetTable";

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
        timeSpent: 120,
    },
    {
        issueId: '1',
        date: new Date(2023, 3, 2),
        timeSpent: 180,
    },
    {
        issueId: '2',
        date: new Date(2023, 3, 1),
        timeSpent: 240,
    },
    {
        issueId: '2',
        date: new Date(2023, 3, 3),
        timeSpent: 60,
    },
    {
        issueId: '3',
        date: new Date(2023, 3, 2),
        timeSpent: 300,
    },
];

function App() {
    return (
        <div className="border px-4">
            <TimesheetTable issues={issues} timeEntries={timeEntries}/>
        </div>
    );
}

export default App;
