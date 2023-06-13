import React, {useState} from 'react';
import {useApolloClient, gql} from '@apollo/client';

function LoginForm() {

    const apolloClient = useApolloClient();
    const [token, setToken] = useState('');
    const [error, setError] = useState('');

    const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);
        setError('');
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        try {
            // Save token to localStorage
            localStorage.setItem('gitlabToken', token);

            // Perform Apollo query
            const {data, errors} = await apolloClient.query({
                query: gql`
          query getAllIssues {
            currentUser {
              id
              name
            }
          }
        `,

            });

            if (errors) {
                // Handle query errors
                setError('Something went wrong with the query.');
                return;
            }

            // If query is successful, redirect to another page
            if (data.currentUser) {
                console.log("token is OK")
                console.log(data)
                //redirect
            }
        } catch (error) {
            // Handle other errors
            setError('An error occurred.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen min-w-800">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/3">
                <label className="block text-gray-700 text-sm font-bold mb-2 text-center" htmlFor="token">
                    GitLab Token
                </label>
                <input
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 ${
                        error ? 'border-red-500' : ''
                    }`}
                    id="token"
                    type="text"
                    placeholder="Enter your GitLab token"
                    onChange={handleTokenChange}
                />
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
                <div className="flex items-center justify-center mt-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        type="submit"
                        onClick={handleSubmit}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
