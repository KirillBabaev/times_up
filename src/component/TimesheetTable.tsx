import React, {useState, useEffect} from 'react';
import {getDaysInMonth, format} from 'date-fns';
import {IIssue, ITimeEntry} from "../model/IIssue";

interface TimesheetTableProps {
    issues: IIssue[];
    timeEntries: ITimeEntry[]
}

const TimesheetTable = ({issues, timeEntries}: TimesheetTableProps) => {
    const [month, setMonth] = useState(new Date());

    useEffect(() => {
        // Здесь можно загрузить данные об отслеживании времени для задач
        // и сохранить их в состоянии timeEntries
    }, [month]);

    const daysInMonth = getDaysInMonth(month);
    const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1);

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}.${mins.toString().padStart(2, '0')}`;
    };

    const getTotalTimeForIssue = (issueId: string) => {
        const totalTime = timeEntries
            .filter((entry) => entry.issueId === issueId)
            .reduce((sum, entry) => sum + entry.timeSpent, 0);
        return formatTime(totalTime);
    };

    const getTimeForIssueAndDay = (issueId: string, day: number) => {
        const entry = timeEntries.find(
            (entry) => entry.issueId === issueId && format(entry.date, 'd') === day.toString()
        );
        return entry ? formatTime(entry.timeSpent) : '';
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full">
                <thead>
                <tr className="bg-gray-200">
                    <th className="px-4 py-2">Issue</th>
                    {daysArray.map((day) => (
                        <th key={day} className="px-4 py-2">
                            {day}
                        </th>
                    ))}
                    <th className="px-4 py-2">Total</th>
                </tr>
                </thead>
                <tbody>
                {issues.map((issue) => (
                    <tr key={issue.id} className="text-center">
                        <td className="border px-4 py-2">{issue.title}</td>
                        {daysArray.map((day) => (
                            <td key={day} className="border px-4 py-2">
                                {getTimeForIssueAndDay(issue.id, day)}
                            </td>
                        ))}
                        <td className="border px-4 py-2">{getTotalTimeForIssue(issue.id)}</td>
                    </tr>
                ))}
                <tr className="text-center font-bold">
                    <td className="border px-4 py-2">Total (mandays)</td>
                    {daysArray.map((day) => (
                        <td key={day} className="border px-4 py-2">
                            {/* Здесь можно вычислить сумму времени за каждый день */}
                        </td>
                    ))}
                    <td className="border px-5 px-4 py-2">
                        {/* Здесь можно вычислить общую сумму времени за весь месяц */}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TimesheetTable;