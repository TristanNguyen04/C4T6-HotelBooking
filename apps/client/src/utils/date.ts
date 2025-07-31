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

export const generateDefaultSearchUrl = () => {
    const today = new Date();
    const checkinDate = new Date(today);
    checkinDate.setDate(today.getDate() + 7);
    
    const checkoutDate = new Date(checkinDate);
    checkoutDate.setDate(checkinDate.getDate() + 2); 
    
    const formatDate = (date: Date): string => {
        return date.toISOString().split('T')[0] as string;
    };
    
    const params = new URLSearchParams();
    params.append('term', 'Singapore, Singapore');
    params.append('destination_id', 'RsBU');
    params.append('checkin', formatDate(checkinDate));
    params.append('checkout', formatDate(checkoutDate));
    params.append('guests', '2');
    params.append('adults', '2');
    params.append('children', '0');
    params.append('rooms', '1');
    
    return `/search?${params.toString()}`;
};