export const parseDate = (dateStr? : string): Date | null => {
    if(!dateStr) return null;
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? null : date;
}