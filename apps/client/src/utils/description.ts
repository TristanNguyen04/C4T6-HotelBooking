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

    console.log(sections);

    const amenities = sections[0];
    const dining = sections[1];
    const businessAmenities = sections[2];
    const rooms = sections[3];
    
    const places = sections[4].split('</p><p>');

    const attractions = places[0].split('<br />').slice(1, -1);
    for (let i = 0; i < attractions.length; i++) {
        attractions[i] = attractions[i].replace(/^ <p>|<\/p>$/g, ' ').trim();
    }

    let nearestAirports: string[] = [];
    if (places[1]) {
        const airportText = places[1].trim();
        if (airportText.includes('<br />')) {
            nearestAirports = airportText.split('<br />').slice(1, -1);
            for (let i = 0; i < nearestAirports.length; i++) {
                nearestAirports[i] = nearestAirports[i].replace(/^<p>|<\/p>$/g, '').trim();
            }
        } else {
            const cleanAirport = airportText.replace(/^<p>|<\/p>$/g, '').trim();
            if (cleanAirport) {
                nearestAirports = [cleanAirport];
            }
        }
    }

    console.log(nearestAirports);

    let preferredAirport = '';
    if(places.length > 2){
        preferredAirport = places[2].replace(/^<p>|<\/p>$/g, '').trim()
    }

    const location = sections[5];
    const headline = sections[6];


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