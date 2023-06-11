import {addMonths, format, getDaysInMonth, isToday, isWeekend, setDate} from 'date-fns';

export const formatTime = (seconds: number) => {

    const hours = Math.floor(seconds / 3600);
    const mins = (seconds % 3600)/3600*60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

export const getDayColor = (date: Date) => {
    return isWeekend(date) ?
        // выходной
        (isToday(date) ? "bg-cyan-100" : "bg-emerald-100") :
        // не выходной
        (isToday(date) ? "bg-cyan-100" : "");
}

export const formatDay = (day: number, month: Date) => {
    const date = setDate(month, day);
    return format(date, 'd E');
}

export const getManDays = (time: number) => {
    return (time / 28800).toFixed(2);
}