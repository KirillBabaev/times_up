import React, {createContext, useEffect, useState} from "react";
import {ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject} from "@apollo/client";

interface ILoginContext {
    logedIn: boolean
    logIn: () => void
    logOut: () => void
    createClient: (token: string) => ApolloClient<NormalizedCacheObject>
}

export const LoginContext = createContext<ILoginContext>({
    logedIn: false,
    logIn: () => {
    },
    logOut: () => {
    },
    createClient: (token: string) => new ApolloClient({
        uri: 'https://gitlab.com/api/graphql',
        cache: new InMemoryCache(),
    })
})

export const LoginState = ({children}: { children: React.ReactNode }) => {
    const [logedIn, setLogedIn] = useState(false)
    const [client, setClient] = useState(new ApolloClient({
        uri: 'https://gitlab.com/api/graphql',
        cache: new InMemoryCache(),
    }))


    useEffect(() => {
    }, [client]);

    const logIn = () => {
        setLogedIn(true)
        console.log(logedIn)
    };
    const logOut = () => {
        setLogedIn(false)
        console.log(logedIn)
    };

    const createClient = (token: string) => {
        const GITLAB_API_URL = 'https://gitlab.com/api/graphql';
        //const GITLAB_API_TOKEN = localStorage.getItem('gitlabToken');
        const GITLAB_API_TOKEN = token;
        const httpLink = new HttpLink({
            uri: GITLAB_API_URL,
            headers: {
                authorization: `Bearer ${GITLAB_API_TOKEN}`

            },
        });
        const client = new ApolloClient({
            link: httpLink,
            cache: new InMemoryCache(),
        });

        setClient(client)
        return client
    };

    return (
        <LoginContext.Provider value={{logedIn, logIn, logOut, createClient}}>
            {children}
        </LoginContext.Provider>
    )
}