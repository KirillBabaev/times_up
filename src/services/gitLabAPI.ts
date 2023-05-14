import {ApolloClient, InMemoryCache, HttpLink, gql} from '@apollo/client';

// Используйте свой GitLab API URL и токен
const GITLAB_API_URL = 'https://gitlab.fel.cvut.cz/api/graphql';
const GITLAB_API_TOKEN = 'N_h4xdWpVcAyCJzbZGkh';

// Создайте HttpLink для связи с GitLab API
const httpLink = new HttpLink({
    uri: GITLAB_API_URL,
    headers: {
        authorization: `Bearer ${GITLAB_API_TOKEN}`,
    },
});

// Создайте экземпляр Apollo Client
export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

// Пример функции для получения списка задач
export const getIssues = async (projectId: string) => {
    const query = gql`
    query {
  currentUser {
    name
    projectMemberships{
      nodes{
        project{
          name
          issues{
            nodes{
              id
              title
              description
              timelogs {
                edges {
                  node {
                    id
                    issue {
                      id
                    }
                    timeSpent
                    summary
                  }
                }
              }
            }
          }
        }
      }
    }
}
}
  `;

    try {
        const {data} = await client.query({
            query
            // variables: {projectId},
        });

        return data;
    } catch (error) {
        console.error('Error fetching issues:', error);
        throw error;
    }
};

// Пример функции для получения затраченного времени по задаче
export const getIssueSpentTime = async (issueId: string) => {
    const query = gql`
    query GetIssueSpentTime($issueId: ID!) {
      issue(id: $issueId) {
        timeSpent
      }
    }
  `;

    try {
        const {data} = await client.query({
            query,
            variables: {issueId},
        });

        return data.issue.timeSpent;
    } catch (error) {
        console.error('Error fetching issue spent time:', error);
        throw error;
    }
};