import {addMonths, format, getDaysInMonth, isToday, isWeekend, setDate} from 'date-fns';

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = seconds % 3600;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}