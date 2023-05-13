import React from "react";
import { LineChart, Line } from "recharts";

export function Dashboard() {
    const data = [
        {name: 'Page A', uv: 400, pv: 2400, amt: 2400},
        {name: 'Page B', uv: 40, pv: 2400, amt: 2400},
        {name: 'Page C', uv: 500, pv: 2400, amt: 2400},
        {name: 'Page D', uv: 200, pv: 2400, amt: 2400},
        {name: 'Page M', uv: 350, pv: 2400, amt: 2400},
    ];
    return (
        <div className="border py-2 px-4 my-8 rounded flex flex-col items-center mb-2">
            <LineChart width={400} height={400} data={data}>
                <Line type="monotone" dataKey="uv" stroke="#1f15e8" />
            </LineChart>
        </div>
    )
}