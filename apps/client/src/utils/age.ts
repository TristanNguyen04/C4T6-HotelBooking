export const parseChildrenAges = (guestsParam: string): number[] => {
    const ages: number[] = [];
    const parts = guestsParam.split('|');
    for (const part of parts) {
        if (part.includes(':')) {
            const agesPart = part.split(':')[1];
            if (agesPart) {
                const roomAges = agesPart.split(',').map(age => parseInt(age)).filter(age => !isNaN(age));
                ages.push(...roomAges);
            }
        }
    }
    return ages;
};

export interface GuestInfo {
    rooms: number;
    adults: number;
    children: number;
    childrenAges: number[];
}

export const parseGuestInfo = (guestsParam: string): GuestInfo => {
    const defaultResult: GuestInfo = { rooms: 1, adults: 0, children: 0, childrenAges: [] };
    
    if (!guestsParam) return defaultResult;
    
    // Handle format like "2|2" (rooms|adults) or "3|3" (rooms|adults)
    if (guestsParam.includes('|') && !guestsParam.includes(':')) {
        const [roomsStr = '', adultsStr = ''] = guestsParam.split('|');
        return {
            rooms: parseInt(roomsStr) || 1,
            adults: parseInt(adultsStr) || 0,
            children: 0,
            childrenAges: []
        };
    }
    
    // Handle format like "2:5,5" (adults:childAge1,childAge2)
    if (guestsParam.includes(':')) {
        const [adultsStr = '', agesStr] = guestsParam.split(':');
        const adults = parseInt(adultsStr) || 0;
        const childrenAges = agesStr ? 
            agesStr.split(',').map(age => parseInt(age)).filter(age => !isNaN(age)) : 
            [];
        
        return {
            rooms: 1, // Default to 1 room when using colon format
            adults,
            children: childrenAges.length,
            childrenAges
        };
    }
    
    // Handle simple number (assume it's adults)
    const numericValue = parseInt(guestsParam);
    if (!isNaN(numericValue)) {
        return {
            rooms: 1,
            adults: numericValue,
            children: 0,
            childrenAges: []
        };
    }
    
    return defaultResult;
};