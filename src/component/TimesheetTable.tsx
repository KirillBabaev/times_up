import React, {useContext, useState} from 'react';
import {addMonths, format, getDaysInMonth, getMonth} from 'date-fns';
import {getDayColor, formatDay, formatTime, getManDays} from "../utils/DateTimeUtils"
import {useIssuesData} from "../hooks/issueData";

import {ModalContext} from "../context/ModalContext";
import {AddTimeModal} from "./AddTimeModal";
import {User} from "../gql model/graphql";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai"
import {Navigation} from "./Navigation";
import {useQuery} from "@apollo/client";
import {LOGIN} from "../services/queries";
import {Navigate} from "react-router-dom";

function TimesheetTable() {

    const {data: loginData, loading: LoginLoading} = useQuery(LOGIN);
    const [month, setMonth] = useState(new Date());
    const daysInMonth = getDaysInMonth(month);
    const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1);
    const {issues, timelogs, currentUser, error, loading: issuesLoading} = useIssuesData();
    const monthButtonStyle = "px-4 py-2 m-3 rounded border";
    const actionButtonStyle = monthButtonStyle + " bg-blue-500 text-white";
    const {modal, open: modalOpen, close: modalClose} = useContext(ModalContext)


    /**
     * Calculates the total time spent on a specific issue.
     * @param issueId - The ID of the issue.
     * @returns The formatted total time spent on the issue.
     */
    const getTotalTimeForIssue = (issueId: string) => {

        const totalTime = timelogs.filter((entry) => entry.issue?.id === issueId &&
            getMonth(new Date(entry.spentAt)) === getMonth(month))
            .reduce((sum, entry) => sum + entry.timeSpent, 0);

        return formatTime(totalTime);
    };


    /**
     * Calculates the total time spent in man-days for a specific month.
     * @returns The total time spent in man-days for the month.
     */
    const getTotalTimeForMonthInManDays = () => {

        const totalTime = timelogs.filter(entry => getMonth(new Date(entry.spentAt)) === getMonth(month))
            .map(entry => entry.timeSpent).reduce((sum, time) => sum + time, 0);
        return getManDays(totalTime);
    }


    /**
     * Switches the month by adding or subtracting a specified amount of months.
     * @param month - The current month.
     * @param amount - The number of months to add or subtract. Use a positive number to move forward in time and a negative number to move backward.
     */
    const switchMonth = (month: Date, amount: number) => {
        const result = addMonths(month, amount);
        setMonth(result);
    }


    /**
     * Retrieves the time spent on a specific issue for a given day and month.
     * @param issueId - The ID of the issue.
     * @param day - The day of the month (1-31).
     * @param month - The month for which to retrieve the time entries.
     * @returns The formatted time spent on the issue, or an empty string if no entry is found.
     */
    const getTimeForIssueAndDay = (issueId: string, day: number, month: Date) => {
        const entry = timelogs.find(
            (entry) => entry.issue?.id === issueId &&
                format(new Date(entry.spentAt), 'd') === day.toString() &&
                getMonth(new Date(entry.spentAt)) === getMonth(month));
        return entry ? formatTime(entry.timeSpent) : '';
    };

    const downloadTableAsCSV = () => {
        const csvContent = createCSVContent();
        const encodedCSVContent = encodeURIComponent(csvContent);
        const downloadLink = document.createElement('a');
        downloadLink.href = `data:text/csv;charset=utf-8,${encodedCSVContent}`;
        downloadLink.download = `${format(month, "MMMM").toLowerCase()}_timesheet.csv`;
        downloadLink.click();
    };

    const createCSVContent = () => {
        let csvContent = '';

        // Add table headers
        csvContent += 'Issue,';
        for (let day = 1; day <= daysInMonth; day++) {
            const formattedDay = formatDay(day, month);
            csvContent += `"${formattedDay}",`;
        }
        csvContent += 'Total\n';

        // Add table rows
        for (const issue of issues) {
            csvContent += `"${issue.title}",`;
            for (let day = 1; day <= daysInMonth; day++) {
                const time = getTimeForIssueAndDay(issue.id, day, month);
                csvContent += `"${time}",`;
            }
            const totalTime = getTotalTimeForIssue(issue.id);
            csvContent += `"${totalTime}"\n`;
        }

        // Add total man-days row
        const totalManDays = getTotalTimeForMonthInManDays();
        csvContent += `MND: ${totalManDays}\n`;

        return csvContent;
    };


    if (error) {
        return (
            <h1>Error is occurred: ${error}</h1>
        )
    }

    if (!LoginLoading && !loginData.currentUser) {
        return <Navigate replace to="/login"/>;
    }

    return (
        <div>
            <Navigation/>
            <div className="flex justify-between">
                <div className="sticky left-0">
                    <button onClick={() => setMonth(new Date())} className={monthButtonStyle}>Today
                    </button>
                    <button onClick={() => switchMonth(month, -1)} className={monthButtonStyle}> <AiOutlineArrowLeft/>
                    </button>
                    <button onClick={() => switchMonth(month, 1)} className={monthButtonStyle}><AiOutlineArrowRight/>
                    </button>
                </div>
                <div className="sticky right-0">
                    <button onClick={modalOpen} className={actionButtonStyle} disabled={issuesLoading}>Add Timelog
                    </button>
                </div>
            </div>
            <div className="overflow-x-auto flex">
                <table className="border-collapse w-full text-xs">
                    <thead className="border">
                    <tr className="bg-gray-200">
                        <th className="sticky left-0 bg-gray-200 px-4 py-2 font-normal">Issue</th>
                        {daysArray.map((day) => (
                            <th key={day} className="px-4 py-2 font-normal w-8">
                                {formatDay(day, month)}
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
                                    {getTimeForIssueAndDay(issue.id, day, month)}
                                </td>
                            ))}
                            <td className="border px-4 py-2">{getTotalTimeForIssue(issue.id)}</td>
                        </tr>
                    ))}
                    <tr className="text-center font-bold">
                        <td colSpan={daysInMonth + 2}
                            className="border px-4 py-2 text-left">MND: {getTotalTimeForMonthInManDays()}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div>
                <button onClick={() => downloadTableAsCSV()} className={actionButtonStyle}>Download CSV
                </button>
            </div>

            {modal && <AddTimeModal onClose={modalClose} issues={issues} currentUser={currentUser as User}/>}

        </div>
    );
}

export default TimesheetTable;