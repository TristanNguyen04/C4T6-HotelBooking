export const formatAmenityName = (key: string): string => {
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

    // empty string or null or undefined
    if (key === '' || !key || key.trim() === '') {
        return '';
    }

    if (specialCases[key]) {
        return specialCases[key];
    }

    return key
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
        .replace(/^./, str => str.toUpperCase());
};