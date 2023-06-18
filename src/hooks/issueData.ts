import {Issue, Project, ProjectMember, Timelog, User} from "../gql model/graphql";
import {ApolloError, useQuery} from "@apollo/client";
import {ALL_ISSUES} from "../services/queries";
import {useEffect, useState} from "react";

/**
 * Custom hook to fetch and manage issues data.
 * @returns An object containing the fetched issues, timelogs, current user, error status, loading state, and projects.
 */
export function useIssuesData() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const [timelogs, setTimelogs] = useState<Timelog[]>([]);
    const [error, setError] = useState<string>();
    const [currentUser, setCurrentUser] = useState<User>()
    const [projects, setProjects] = useState<Project[]>([])

    const {data: issuesData, loading} = useQuery(ALL_ISSUES);

    useEffect(() => {
        function fetchData() {
            try {
                setCurrentUser(issuesData?.currentUser);
                const fetchedProjects: Project[] = issuesData?.currentUser?.projectMemberships.nodes.map((member:ProjectMember) => member.project).filter(Boolean) as Project[] ?? [];
                setProjects(fetchedProjects);
                const fetchedIssues: Issue[] = fetchedProjects.flatMap((project: Project) => project?.issues?.nodes).filter(Boolean) as Issue[] ?? [];
                setIssues(fetchedIssues);
                const timeEntries: Timelog[] = (fetchedIssues
                    .flatMap((issue) => issue.timelogs.nodes)
                    .filter((timelog) => timelog && timelog.user?.id === issuesData?.currentUser?.id))
                    //remove all null and undefined and explicitly specify the type of the resulting array as Timelog[]
                    .filter(Boolean) as Timelog[] ?? [];
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

    return {issues, timelogs, currentUser, error, loading, projects};
}
