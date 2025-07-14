export const formatAmenityName = (key: string): string => {
    // Handle specific common cases first
    const specialCases: { [key: string]: string } = {
        'tVInRoom': 'TV in Room',
        'freeWifi': 'Free WiFi',
        'freeWiFi': 'Free WiFi',
        'wiFi': 'WiFi',
        'airConditioning': 'Air Conditioning',
        'businessCenter': 'Business Center',
        'meetingRooms': 'Meeting Rooms',
        'outdoorPool': 'Outdoor Pool',
        'parkingGarage': 'Parking Garage',
        'roomService': 'Room Service',
        'clothingIron': 'Clothing Iron',
        'dataPorts': 'Data Ports',
        'dryCleaning': 'Dry Cleaning',
        'hairDryer': 'Hair Dryer',
        'voiceMail': 'Voice Mail'
    };

    if (specialCases[key]) {
        return specialCases[key];
    }

    return key
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .replace(/^./   , str => str.toUpperCase());
};