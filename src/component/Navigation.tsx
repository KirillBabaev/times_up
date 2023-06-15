import React from "react";
import {Link} from "react-router-dom";

export function Navigation(){
    return(
        <nav className="h-[50px] flex justify-between px-5 bg-blue-500 text-white">
            <span className="font-bold mt-3">TimesUP!</span>

            <span className="mt-2">
                <Link to="/timesheet" className="mx-2 my-2">Timesheet</Link>
                <Link to="/dashboard" className="mx-2 my-2">Dashboard</Link>
            </span>
        </nav>
    )
}