export const parseDate = (dateStr? : string): Date | null => {
    if(!dateStr) return null;
    const splittedDate = dateStr.split('/'); /// dd/MM/yyyy
    const date = new Date(splittedDate[2]+"-"+splittedDate[1]+"-"+splittedDate[0]); // YYYY-MM-DD
    return isNaN(date.getTime()) ? null : date;
}

export const convertDateFormat = (dateStr? : string): string => {
    if(!dateStr) return "";
    const splittedDate = dateStr.split('/'); /// dd/MM/yyyy
    const newDateFormat = splittedDate[2]+"-"+splittedDate[1]+"-"+splittedDate[0];

    return newDateFormat;
}