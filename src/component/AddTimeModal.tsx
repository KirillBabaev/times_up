import React, {useEffect, useState} from "react";
import {Issue, TimelogCreateInput, User} from "../gql model/graphql";
import {useMutation} from "@apollo/client";
import {CREATE_TIMELOG} from "../services/queries";

interface AddTimeModalProps {
    onClose: () => void;
    issues: Issue[]
    currentUser: User
}

export function AddTimeModal({onClose, issues, currentUser}: AddTimeModalProps) {

    const [selectedIssue, setSelectedIssue] = useState<Issue>(issues[0]);
    const [errorMinutes, setErrorMinutes] = useState('');
    const [errorHours, setErrorHours] = useState('');
    const [errorDate, setErrorDate] = useState('');
    const [errorSummary, setErrorSummary] = useState('');
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [summary, setSummary] = useState("");
    const [spentAt, setSpentAt] = useState(new Date());
    const [createTimelog] = useMutation(CREATE_TIMELOG);
    //TODO Add Cache
    const numberInputStyle = "shadow appearance-none border rounded w-14 my-2 mx-4 px-2 text-gray-700 text-right "

    useEffect(() => {
    }, [selectedIssue]);

    const chooseHandler = function (id: string) {
        console.log(id);
        const chosenIssue = issues.filter(issue => issue.id === id)[0];
        setSelectedIssue(chosenIssue);
    }

    const submitHandler = function (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            if (selectedIssue && hours && minutes && spentAt) {
                const userId = currentUser.id;
                const timeSpent = hours + "h " + minutes + "m";
                const whenSpent = spentAt.toISOString();
                const sum = summary;
                const issueId = selectedIssue.id;
                const timelogCreateInput: TimelogCreateInput = {
                    clientMutationId: userId,
                    issuableId: issueId,
                    spentAt: whenSpent,
                    summary: sum,
                    timeSpent: timeSpent

                }
                createTimelog({variables: {input: timelogCreateInput}}).catch(error => console.log(error))
                onClose();
            }
        } catch (error) {
            console.log(error)
        }

    }

    const dateValidation = function (dateStr: string) {
        const date = new Date(dateStr);
        console.log(date.toISOString())
        date.setHours(0, 0, 0);
        if (date > new Date()) {
            setErrorDate("You cannot choose a date from the future");
        } else if (date < new Date(2011, 10, 13)) {
            setErrorDate("GitLab did not exist yet");
        } else {
            setSpentAt(date);
            setErrorDate('');
        }
    }

    const summaryValidation = function (sum: string) {
        if (sum.length > 100) {
            setErrorSummary("Max 100 characters");
        } else {
            setErrorSummary('');
            setSummary(sum);
        }
    }

    const hoursValidation = function (h: number) {
        if (h > 8 || h < 0) {
            setErrorHours("The hour value must be greater than 8 and less than 0")
        } else {
            setErrorHours('');
            setHours(h);
        }
    }

    const minutesValidation = function (m: number) {
        if (m > 59 || m < 0) {
            setErrorMinutes("The minute value must be greater than 59 and less than 0")
        } else {
            setErrorMinutes('');
            setMinutes(m);
        }
    }


    return (
        <>
            <div
                className="fixed bg-black/25 top-0 right-0 left-0 bottom-0"
                onClick={onClose}
            />
            <div
                className="w-[500px] p-5 rounded bg-white fixed top-10 left-1/2 -translate-x-1/2"
            >
                <h1 className='text-2xl text-center mb-2'>Add Timelog</h1>
                <form onSubmit={e => submitHandler(e)}>
                    <select name="example" required={true} defaultValue={issues[0].title}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                chooseHandler(e.target.value)
                            }} className="border py-2 px-4 mb-2 w-full shadow rounded">
                        {issues.map((issue) => (
                            <option key={issue.id} value={issue.id}
                                    className="">{issue.title}</option>
                        ))}
                    </select>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center mt-4">
                            <input id="h" type="number" required={true}
                                   onChange={e => hoursValidation(parseInt(e.target.value))}
                                   className={`${numberInputStyle} ${errorHours ? 'border-red-500' : ''}`}/>
                            <label htmlFor="h" className="py-2">Hours</label>
                            <input id="m" type="number" required={true}
                                   onChange={e => minutesValidation(parseInt(e.target.value))}
                                   className={`${numberInputStyle} ${errorMinutes ? 'border-red-500' : ''}`}/>
                            <label htmlFor="m" className="py-2">Minutes</label>
                        </div>
                        {errorHours && <span className="text-red-500">{errorHours}</span>}
                        {errorMinutes && <span className="text-red-500">{errorMinutes}</span>}
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center mt-4">
                            <label htmlFor="spent-at">
                                Spent at
                                <span className="text-gray-500"> (optional)</span>
                            </label>
                            <input id="spent-at" type="date"
                                   onChange={e => dateValidation(e.target.value)}
                                   className={`shadow appearance-none border rounded px-2 my-2 mx-4 text-gray-700 ${errorDate ? 'border-red-500' : ''}`}/>
                        </div>
                        {errorDate && <span className="text-red-500">{errorDate}</span>}
                    </div>
                    <div className="mt-4 flex flex-col items-center">
                        <label htmlFor="summary" className="">
                            Summary
                            <span className="text-gray-500"> (optional)</span>
                        </label>
                        <textarea id="summary" rows={4} onChange={e => summaryValidation(e.target.value)}
                                  className={`resize-none appearance-none shadow border w-1/2 rounded px-2 my-2 mx-4 text-gray-700 ${errorSummary ? 'border-red-500' : ''}`}></textarea>
                        {errorSummary && <span className="text-red-500">{errorSummary}</span>}
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <button className="w-1/4 px-4 py-2 m-3 rounded border bg-blue-500 text-white" type='submit'>Save
                        </button>
                        <button onClick={() => {
                            onClose()
                        }} className="w-1/4 px-4 py-2 m-3 rounded border">Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>

    )
}
