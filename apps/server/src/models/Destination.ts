export interface Destination{
    uid: string;
    term: string;
    lat: number;
    lng: number;
    state?: string;
    type: 'city' | 'airport';
}