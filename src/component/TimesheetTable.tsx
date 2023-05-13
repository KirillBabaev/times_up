import React, {useEffect, useState} from 'react';
import {addMonths, format, getDaysInMonth, isToday, isWeekend, setDate} from 'date-fns';
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
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    };

    const formatDay = (day: number) => {
        console.log("Day number is " + day);
        console.log("Month is " + month);
        const date = setDate(month, day);
        console.log("Date we set is " + date);
        return format(date, 'd E');
    }


    const getTotalTimeForIssue = (issueId: string) => {
        const totalTime = timeEntries
            .filter((entry) => entry.issueId === issueId)
            .reduce((sum, entry) => sum + entry.timeSpent, 0);
        return formatTime(totalTime);
    };

    const getTotalTimeForMonthInManDays = () => {
        const totalTime = timeEntries.map(entry => entry.timeSpent).reduce((sum, time) => sum + time);
        return getManDays(totalTime);
    }

    const getManDays = (time: number) => {
        return time / 480;
    }

    const switchMonth = (month: Date, amount: number) => {
        const result = addMonths(month, amount);
        setMonth(result);
    }

    const getTimeForIssueAndDay = (issueId: string, day: number) => {
        const entry = timeEntries.find(
            (entry) => entry.issueId === issueId && format(entry.date, 'd') === day.toString()
        );
        return entry ? formatTime(entry.timeSpent) : '';
    };

    const getDayColor = (date: Date) => {
        return isWeekend(date) ?
            // выходной
            (isToday(date) ? "bg-cyan-100" : "bg-emerald-100") :
            // не выходной
            (isToday(date) ? "bg-cyan-100" : "");
    }

    return (
        <div className="overflow-x-auto">
            <button onClick={() => switchMonth(month, -1)} className="px-4 py-2 m-3 rounded border">prev month</button>
            <button onClick={() => switchMonth(month, 1)} className="px-4 py-2 m-3 rounded border">next month</button>
            <table className="border-collapse w-full text-xs">
                <thead className="border">
                <tr className="bg-gray-200">
                    <th className="sticky left-0 bg-gray-200 px-4 py-2 font-normal">Issue</th>
                    {daysArray.map((day) => (
                        <th key={day} className="px-4 py-2 font-normal w-8">
                            {formatDay(day)}
                        </th>
                    ))}
                    <th className="px-4 py-2">Total</th>
                </tr>
                </thead>
                <tbody>
                {issues.map((issue) => (
                    <tr key={issue.id} className="text-center">
                        <td className="sticky left-0 bg-white border px-4 py-2">{issue.title}</td>
                        {daysArray.map((day) => (
                            <td key={day}
                                className={"border px-4 py-2 " + getDayColor(new Date(month.getFullYear(), month.getMonth(), day))}>
                                {getTimeForIssueAndDay(issue.id, day)}
                            </td>
                        ))}
                        <td className="border px-4 py-2">{getTotalTimeForIssue(issue.id)}</td>
                    </tr>
                ))}
                <tr className="text-center font-bold">
                    <td colSpan={daysInMonth + 2}
                        className="border px-4 py-2 text-left">MND: {getTotalTimeForMonthInManDays()}</td>
                    {/*{daysArray.map((day) => (*/}
                    {/*    <td key={day} className="border px-4 py-2">*/}
                    {/*        /!* Здесь можно вычислить сумму времени за каждый день *!/*/}
                    {/*    </td>*/}
                    {/*))}*/}
                    {/*<td className="border px-4 py-2">*/}
                    {/*    /!* Здесь можно вычислить общую сумму времени за весь месяц *!/*/}
                    {/*</td>*/}
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TimesheetTable;