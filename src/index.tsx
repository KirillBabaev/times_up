import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {ApolloProvider} from "@apollo/client";
import {ModalState} from "./context/ModalContext";
import {client} from "./services/client";


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
        <ModalState>
            <ApolloProvider client={client}>
                <App/>
            </ApolloProvider>
        </ModalState>
);

reportWebVitals();
