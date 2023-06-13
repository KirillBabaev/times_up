import {Issue, ProjectMember, Timelog} from "../gql/graphql";
import {ApolloError, useQuery} from "@apollo/client";
import {ALL_ISSUES} from "../services/queries";
import {useEffect, useState} from "react";

export function useIssuesData() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [timelogs, setTimelogs] = useState<Timelog[]>([]);
    const [error, setError] = useState<string>();

    const {data: issuesData} = useQuery(ALL_ISSUES);


    useEffect(() => {
        function fetchData() {
            try {
                const fetchedIssues: Issue[] =
                    issuesData?.currentUser?.projectMemberships.nodes.flatMap((project: ProjectMember) => project?.project?.issues?.nodes) ?? [];
                setIssues(fetchedIssues);
                const timeEntries: Timelog[] = (fetchedIssues
                    .flatMap((issue) => issue.timelogs.nodes)
                    .filter((timelog) => timelog && timelog.user?.id === issuesData?.currentUser?.id) || [])
                    //remove all null and undefined and explicitly specify the type of the resulting array as Timelog[]
                    .filter(Boolean) as Timelog[];
                setTimelogs(timeEntries);
            } catch (e) {
                const error = e as ApolloError;
                setError(error.message);
            }
        }

        if (issuesData) {
            fetchData();
        }
    }, [issuesData]);

    return {issues, timelogs, error};
}


// import {Issue, ProjectMember, Timelog} from "../gql/graphql";
// import {ApolloError, useQuery} from "@apollo/client";
// import {ALL_ISSUES} from "../services/queries";
// import {useEffect, useState} from "react";
//
// export function useIssuesData() {
//     const [issues, setIssues] = useState<Issue[]>([])
//     const [timelogs, setTimelogs] = useState<Timelog[]>([])
//     const [loading, setLoading] = useState<boolean>(false)
//     const [error, setError] = useState<string>()
//
//     function fetchData() {
//         try {
//             setLoading(true);
//             const {data: issuesData} = useQuery(ALL_ISSUES);
//             const issues: Issue[] = issuesData?.currentUser?.projectMemberships.nodes.flatMap((project: ProjectMember) => project?.project?.issues?.nodes) ?? [];
//             setIssues(issues);
//             const timeEntries: Timelog[] = (issues
//                 .flatMap(issue => issue.timelogs.nodes)
//                 .filter(timelog => timelog && timelog.user?.id === issuesData?.currentUser?.id) || [])
//                 //remove all null and undefined and explicitly specify the type of the resulting array as Timelog[]
//                 .filter(Boolean) as Timelog[];
//             setTimelogs(timeEntries)
//             setLoading(false);
//         } catch (e) {
//             const error = e as ApolloError;
//             setLoading(false);
//             setError(error.message)
//         }
//     }
//
//     useEffect(() => {
//         fetchData()
//     }, [])
//
//
//     return {issues, timelogs, loading, error}
//
// }
