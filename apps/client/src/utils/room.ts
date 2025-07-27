import * as cheerio from 'cheerio';
import type { Room } from '../types/hotel';


export function parseRoomJson(json: Room) {
    // Check if long_description is a valid string
    const html = typeof json.long_description === 'string' ? json.long_description : '';
    
    // Initialize the result object with proper typing
    const extracted: any = {};
    
    // Return early if there's no HTML to parse
    if (!html) {
        return extracted;
    }
    
    // Load the HTML for parsing
    const $ = cheerio.load(html);

    // 1. Extract Room Type (inside <p><strong>...</strong></p>)
    const strongText = $('p strong').first().text().trim();
    if (strongText) extracted.roomType = strongText;

    // 2. Extract Area (usually the <p> after </strong>)
    const areaText = $('p strong').parent().next('p').text().trim();
    if (areaText) extracted.area = areaText;

    // 3. Extract key-value sections (bolded titles with dash)
    $('p').each((_, el) => {
        const bold = $(el).find('b').first().text().trim();
        const fullText = $(el).text().trim();

        if (bold && fullText.startsWith(bold)) {
            const value = fullText.replace(bold, "").replace(/^(\s*[-–:]\s*)/, "").trim();

            // Convert label to camelCase key
            const key = bold
                .replace(/[^a-zA-Z0-9 ]/g, '')       // Remove symbols
                .replace(/\s+(.)/g, (_, c) => c.toUpperCase()) // Space to camelCase
                .replace(/^\w/, c => c.toLowerCase());         // Lowercase first letter

            extracted[key] = value;
        }
    });

    // 4. Get Smoking Policy and Additional Info (plain <p> at end)
    const plainParagraphs = $('p').filter((_, el) => $(el).find('b').length === 0 && $(el).find('strong').length === 0);
    const smokingPolicy = plainParagraphs.eq(-1).text().trim();
    if (smokingPolicy.includes("Non-Smoking")) extracted.smokingPolicy = smokingPolicy;


    const displayFields = json.roomAdditionalInfo?.displayFields;

    const extractListAndNote = (html: string) => {
        const $ = cheerio.load(html);
        const items: string[] = [];

        $('li').each((_, el) => {
            items.push($(el).text().trim());
        });

        const note = $('p').text().trim(); // for trailing notes, like in fees_optional

        return {
            items,
            ...(note && { note })
        };
    };

    const extractListOnly = (html: string) => {
        const $ = cheerio.load(html);
        const items: string[] = [];

        $('li').each((_, el) => {
            items.push($(el).text().trim());
        });

        return items;
    };

    const additionalInfo_2 = {
        checkInInstructions: displayFields?.check_in_instructions ? extractListOnly(displayFields.check_in_instructions) : [],
        knowBeforeYouGo: displayFields?.know_before_you_go ? extractListOnly(displayFields.know_before_you_go) : [],
        feesOptional: displayFields?.fees_optional ? extractListAndNote(displayFields.fees_optional) : { items: [] }
    };

    // Return the extracted data
    return {
        roomDetails: extracted,
        additionalInfo: additionalInfo_2
    };
}


export function getLowestRoomPrice(rooms: Room[]): number | null {
    if (!rooms || rooms.length === 0) {
        return null;
    }

    const prices = rooms
        .map(room => room.converted_price)
        .filter(price => price != null && price > 0);

    if (prices.length === 0) {
        return null;
    }

    return Math.min(...prices);
}





