// Используйте свой GitLab API URL и токен
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";

const GITLAB_API_URL = 'https://gitlab.fel.cvut.cz/api/graphql';
const GITLAB_API_TOKEN = 'N_h4xdWpVcAyCJzbZGkh';

// Создайте HttpLink для связи с GitLab API
const httpLink = new HttpLink({
    uri: GITLAB_API_URL,
    headers: {
        authorization: `Bearer ${GITLAB_API_TOKEN}`

    },
});

// Создайте экземпляр Apollo Client
export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});