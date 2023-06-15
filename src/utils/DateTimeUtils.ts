import {format, isToday, isWeekend, setDate} from 'date-fns';

/**
 * Formats the given number of seconds into a time format (HH:mm).
 * @param seconds - The number of seconds to format.
 * @returns The formatted time in the format HH:mm.
 */
export const formatTime = (seconds: number) => {

    const hours = Math.floor(seconds / 3600);
    const mins = (seconds % 3600)/3600*60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

/**
 * Determines the background color for a given date based on whether it is a weekend or not.
 * @param date - The date to check.
 * @returns The background color class name for the date.
 */
export const getDayColor = (date: Date) => {
    return isWeekend(date) ?
        // weekend
        (isToday(date) ? "bg-cyan-100" : "bg-emerald-100") :
        // workday
        (isToday(date) ? "bg-cyan-100" : "");
}

/**
 * Formats the day and month into a displayable format.
 * @param day - The day of the month.
 * @param month - The month to which the day belongs.
 * @returns The formatted day and month.
 */
export const formatDay = (day: number, month: Date) => {
    const date = setDate(month, day);
    return format(date, 'do E');
}

/**
 * Calculates the number of man-days based on the given time in seconds.
 * @param time - The time in seconds.
 * @returns The calculated number of man-days.
 */
export const getManDays = (time: number) => {
    return (time / 28800).toFixed(2);
}