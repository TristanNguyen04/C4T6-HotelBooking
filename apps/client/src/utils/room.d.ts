import type { Room } from '../types/hotel';
export declare function parseRoomJson(json: Room): {
    roomDetails: Record<string, string>;
    additionalInfo: {
        checkInInstructions: string[];
        knowBeforeYouGo: string[];
        feesOptional: {
            note?: string | undefined;
            items: string[];
        };
    };
};
export declare function getLowestRoomPrice(rooms: Room[]): number | null;
