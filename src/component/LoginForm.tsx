import React, {useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {LOGIN} from "../services/queries";
import {Link, Navigate} from "react-router-dom";


export function LoginForm() {

    const [token, setToken] = useState('');
    const [error, setError] = useState('');
    const [login] = useLazyQuery(LOGIN);
    const [isAuthenticated, setAuthenticated] = useState(false);

    /**
     * Handles the change event of the token input field.
     * @param event - The change event of the input field.
     */
    const handleTokenChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setToken(event.target.value);
        setError('');
    };

    /**
     * Handles the form submission event.
     * @param event - The form submission event.
     */
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Save token to localStorage
        localStorage.setItem('gitlabToken', token);
        // Perform Apollo query
        const {data} = await login();
        console.log(data)
        if (data) {
            console.log("token is OK")
           setAuthenticated(true);
        }else{
            setError('Something went wrong with the query.')
        }

    };

    if(isAuthenticated){
        return <Navigate replace to="/timesheet"/>;
    }
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
                    <Link to="/timesheet" className="mx-2 my-2">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            type="submit"
                            onClick={handleSubmit}>
                            Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

