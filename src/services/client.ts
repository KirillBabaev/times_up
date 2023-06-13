import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";



const GITLAB_API_URL = 'https://gitlab.com/api/graphql';
let GITLAB_API_TOKEN = 'glpat-YpE5c76RRBP5dAc1rh6R';

const httpLink = new HttpLink({
    uri: GITLAB_API_URL,
    headers: {
        authorization: `Bearer ${GITLAB_API_TOKEN}`

    },
});

export const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});