export interface HotelDescription {
    amenities: string;
    dining: string;
    businessAmenities: string;
    rooms: string;
    attractions: string[];
    nearestAirports: string[];
    preferredAirport: string;
    location: string;
    headline: string;
}

export function parseHotelDescription(text: string): HotelDescription {

    const sections = text.split('\n\n');

    const amenities = sections[0];
    const dining = sections[1];
    const businessAmenities = sections[2];
    const rooms = sections[3];
    
    const places = sections[4].split('</p><p>');

    const attractions = places[0].split('<br />').slice(1, -1);
    for (let i = 0; i < attractions.length; i++) {
        attractions[i] = attractions[i].replace(/^ <p>|<\/p>$/g, ' ').trim();
    }
    const nearestAirports = places[1].split('<br />').slice(1, -1);
    for (let i = 0; i < nearestAirports.length; i++) {
        nearestAirports[i] = nearestAirports[i].replace(/^ <p>|<\/p>$/g, ' ').trim();
    }
    const preferredAirport = places[2].replace(/^<p>|<\/p>$/g, '').trim()

    const location = sections[5];
    const headline = sections[6];

    console.log(attractions);

    return {
        amenities,
        dining,
        businessAmenities,
        rooms,
        attractions,
        nearestAirports,
        preferredAirport,
        location,
        headline
    };
}