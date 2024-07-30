const parseDate = (date: number[]): Date => {
    return new Date(date[0], date[1], date[2]);
}

const parseDateToString = (date: number[]): string => {
    var parsedDate = parseDate(date);
    return parsedDate.toLocaleDateString();
}

export const DateUtils = {
    parseDate,
    parseDateToString,
}