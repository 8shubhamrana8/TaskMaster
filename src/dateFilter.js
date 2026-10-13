import { isToday as funcIsToday, isThisWeek as funcIsWeek } from "date-fns";

export function isToday(dateString) {
    // if no string return false
    if (!dateString) return false;
    // send true or false if funcIsToday(date)
    return funcIsToday(new Date(dateString));
}

export function isThisWeek(dateString) {
    // if no string return false
    if (!dateString) return false;
    // returns true or false
    return funcIsWeek(new Date(dateString));
}