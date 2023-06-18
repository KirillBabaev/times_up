import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";


const GITLAB_API_URL = 'https://gitlab.com/api/graphql';

const httpLink = createHttpLink({
    uri: GITLAB_API_URL
});

const authLink = setContext((req) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('gitlabToken');
    // return the headers to the context so httpLink can read them
    return {
        headers: {
            authorization: token ? `Bearer ${token}` : "",
        }
    }
});

export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
});