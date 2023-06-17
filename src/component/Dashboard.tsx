import React, {useState} from "react";
import {
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    Legend,
    Tooltip,
    CartesianGrid,
    XAxis, YAxis
} from "recharts";
import {schemeSet2} from "d3-scale-chromatic";
import {useIssuesData} from "../hooks/issueData";
import {addMonths, format, getDaysInMonth, setDate} from "date-fns";

export function Dashboard() {

    const [month, setMonth] = useState(new Date());
    const daysInMonth = getDaysInMonth(month);
    const daysArray = Array.from({length: daysInMonth}, (_, i) => i + 1);
    const {timelogs, projects} = useIssuesData();
    const monthButtonStyle = "px-4 py-2 m-3 rounded border";

    const formatComparisonDate = function (date: number | string) {
        if (typeof date === 'string') {
            return format(new Date(date), "dd/MM/yyyy")
        }
        const currDate: Date = setDate(new Date(month), date);
        return format(currDate, "dd/MM/yyyy")
    }


    const createLineData = function () {
        const lineDataList: { name: string; Hours: number; }[] = [];
        daysArray.forEach(day => {
            let totalDayTime = 0;
            timelogs.forEach(log => {
                if (formatComparisonDate(log.spentAt) === formatComparisonDate(day)) {
                    totalDayTime += log.timeSpent
                }
            });
            lineDataList.push({name: day + "", Hours: Number((totalDayTime / 3600).toFixed(2))})
        });
        return lineDataList;
    };

    const createPieData = function () {
        const linePieList: { name: string; value: number; }[] = [];
        projects.forEach((project) => {
            let totalProjectTime = 0;
            timelogs.forEach((timelog) => {
                console.log('time log ' + formatComparisonDate(timelog.spentAt));
                console.log('month log ' + formatComparisonDate(month.getDate()));
                if (parseInt(project.id.slice(-8)) === timelog.issue?.projectId &&
                    format(new Date(timelog.spentAt), "MM/yyyy") === format(month, "MM/yyyy")) {
                    totalProjectTime += timelog.timeSpent;
                }
            });
            linePieList.push({name: project.name, value: totalProjectTime});
        });
        return linePieList;
    };

    const lineData = createLineData();

    const pieData = createPieData();

    const COLORS = schemeSet2.slice(0, pieData.length);

    const RADIAN = Math.PI / 180;
    // @ts-ignore
    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    /**
     * Switches the month by adding or subtracting a specified amount of months.
     * @param month - The current month.
     * @param amount - The number of months to add or subtract. Use a positive number to move forward in time and a negative number to move backward.
     */
    const switchMonth = (month: Date, amount: number) => {
        const result = addMonths(month, amount);
        setMonth(result);
    }

    return (
        <div>
            <div className="sticky left-0">
                <button onClick={() => switchMonth(month, -1)} className={monthButtonStyle}>prev month
                </button>
                <button onClick={() => switchMonth(month, 1)} className={monthButtonStyle}>next month
                </button>
            </div>
            <div className="border py-2 px-4 my-8 rounded flex items-center justify-between mb-2">

                <LineChart
                    width={900}
                    height={600}
                    data={lineData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="Hours" stroke="#8884d8"
                          activeDot={{r: 5}}/>
                </LineChart>

                <PieChart width={600} height={600}>
                    <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={200}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                    </Pie>
                    <Legend/>
                </PieChart>
            </div>
        </div>
    )
}