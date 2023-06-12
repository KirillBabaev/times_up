import React from 'react';
// import './App.css';
import TimesheetTable from "./component/TimesheetTable";
import {Navigation} from "./component/Navigation";
import {Route, Routes} from "react-router-dom";
import {Dashboard} from "./component/Dashboard";
import {Issue, ProjectMember, Timelog} from "./gql/graphql";
import {useQuery} from "@apollo/client";
import {ALL_ISSUES} from "./services/queries";
import LoginForm from "./component/LoginForm";

function useIssuesData() {
    const { data, loading, error } = useQuery(ALL_ISSUES);
    return { data, loading, error };
}

function App() {

    const {data : issuesData, loading : issuesLoading} = useIssuesData();
    const issues: Issue[] = issuesData?.currentUser?.projectMemberships.nodes.flatMap((project: ProjectMember) => project?.project?.issues?.nodes) ?? [];
    const timeEntries: (Timelog | null | undefined)[] = issues
                                                        .flatMap(issue => issue.timelogs.nodes)
                                                        .filter(timelog => timelog && timelog.user?.id === issuesData?.currentUser?.id)??[];

    //console.log(format(dft, 'd'));
    if (issuesLoading){
        return (
            <h2 className="text-center">Loading...</h2>
        )
    }
    return (
        <div>
            {/*<Navigation/>*/}
            {/*<Routes>*/}
            {/*    <Route path="/timesheet" element={<TimesheetTable issues={issues} timeEntries={timeEntries as any}/>}/>*/}
            {/*    <Route path="/dashboard" element={<Dashboard/>}/>*/}
            {/*</Routes>*/}
            <LoginForm/>
        </div>
    );
}

export default App;
