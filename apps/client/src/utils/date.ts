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

// Add function to calculate nights between two dates
export const calculateNights = (checkin: string, checkout: string): number => {
    const checkinDate = parseDate(checkin);
    const checkoutDate = parseDate(checkout);
    
    if (!checkinDate || !checkoutDate) return 1;
    
    const timeDiff = checkoutDate.getTime() - checkinDate.getTime();
    const nightsDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return nightsDiff > 0 ? nightsDiff : 1;
}