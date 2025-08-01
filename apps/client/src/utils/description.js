import * as cheerio from 'cheerio';
export function parseHotelDescription(text) {
    console.log(text);
    // 1. Convert escaped unicode to HTML
    const unescaped = text
        .replace(/\\u003C/g, '<')
        .replace(/\\u003E/g, '>')
        .replace(/\\u002F/g, '/')
        .replace(/\\n/g, '\n');
    // 2. Split into sections for basic structure
    const sections = unescaped.split('\n\n');
    const amenities = sections[0] || '';
    const dining = sections[1] || '';
    // 3. Load into Cheerio for complex parsing
    const $ = cheerio.load(unescaped);
    // 4. Parse business amenities section (can span multiple paragraphs)
    const closedFacilities = [];
    let businessAmenitiesOther = '';
    // Find sections with HTML lists and extract context + facilities
    // But exclude amenities and dining sections
    const businessText = sections.slice(2).join('\n\n'); // Skip amenities (0) and dining (1)
    const listMatches = businessText.match(/([^<]*?)<ul>([\s\S]*?)<\/ul>/g);
    if (listMatches) {
        listMatches.forEach(match => {
            const contextMatch = match.match(/^([^<]+?)(?=<ul>)/);
            const context = contextMatch?.[1]?.trim() || '';
            const $match = cheerio.load(match);
            const facilities = [];
            $match('ul li').each((_, el) => {
                facilities.push($(el).text().trim());
            });
            if (facilities.length > 0) {
                closedFacilities.push({ context, facilities });
            }
        });
    }
    // Find business amenities text sections (excluding those with HTML lists)
    const businessSections = [];
    for (let i = 2; i < sections.length; i++) {
        const section = sections[i];
        if (!section)
            continue;
        // Stop when we hit the rooms section (usually mentions "air-conditioned rooms" or "Make yourself at home")
        if (section.toLowerCase().includes('make yourself at home') ||
            section.toLowerCase().includes('air-conditioned rooms')) {
            break;
        }
        // Stop when we hit the distances section
        if (section.toLowerCase().includes('distances are displayed')) {
            break;
        }
        // Include sections that seem like business amenities but don't have HTML lists
        if ((section.toLowerCase().includes('amenities') ||
            section.toLowerCase().includes('facilities') ||
            section.toLowerCase().includes('front desk') ||
            section.toLowerCase().includes('parking') ||
            section.toLowerCase().includes('services')) &&
            !section.includes('<ul>')) {
            businessSections.push(section.trim());
        }
    }
    businessAmenitiesOther = businessSections.join(' ');
    // 5. Find rooms section
    const roomsSection = sections.find(section => section.toLowerCase().includes('make yourself at home') ||
        section.toLowerCase().includes('air-conditioned rooms'));
    const rooms = roomsSection || sections[3] || '';
    // 6. Parse distances and locations
    const distanceSection = sections.find(section => section.toLowerCase().includes('distances are displayed'));
    const attractions = [];
    const nearestAirports = [];
    if (distanceSection) {
        // Extract all location items from the HTML
        const locationMatches = distanceSection.match(/<br\s*\/>\s*([^<]+?)(?=\s*<br|<\/p>)/g);
        if (locationMatches) {
            locationMatches.forEach(match => {
                const cleaned = match.replace(/<br\s*\/>\s*/, '').trim();
                if (cleaned && cleaned.includes(' - ')) {
                    if (cleaned.toLowerCase().includes('airport')) {
                        nearestAirports.push(cleaned);
                    }
                    else if (!cleaned.toLowerCase().includes('nearest airports')) {
                        attractions.push(cleaned);
                    }
                }
            });
        }
    }
    // 7. Parse preferred airport
    const preferredAirportMatch = unescaped.match(/The preferred airport.*?\./);
    const preferredAirport = preferredAirportMatch?.[0]?.replace(/^<p>|<\/p>$/g, '').trim() || '';
    // 8. Find location section (usually starts with "With a stay at" or similar)
    const locationSection = sections.find(section => section.toLowerCase().includes('with a stay at') ||
        section.toLowerCase().includes('centrally located') ||
        (section.toLowerCase().includes('hotel') && section.includes('mi (') && section.includes('km)')));
    const location = locationSection || sections[sections.length - 2] || '';
    // 9. Headline is usually the last section
    const headline = sections[sections.length - 1] || '';
    return {
        amenities,
        dining,
        businessAmenities: {
            closedFacilities,
            other: businessAmenitiesOther
        },
        rooms,
        attractions: attractions || [],
        nearestAirports: nearestAirports || [],
        preferredAirport,
        location,
        headline
    };
}
