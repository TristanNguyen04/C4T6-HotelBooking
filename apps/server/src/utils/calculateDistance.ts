export const calculateDistance = (lat1: number, lng1: number , lat2: number, lng2: number) => {
    if( -90 > lat1  || lat1 > 90 || lng1 > 180 || lng1 < -180 || 
        -90 > lat2 || lat2 > 90 || lng2 > 180 || lng2 < -180
    ){
        throw new Error('Invalid latitude or longitude values');
    }
    const EARTH_RADIUS_KM = 6371;
    const toRadian = (degrees:number) => degrees * Math.PI / 180 ;
    const dLat = toRadian(lat2 - lat1);
    const dLng = toRadian(lng2 - lng1);
    const a = Math.sin(dLat/2) ** 2 + Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) *
    Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a) , Math.sqrt(1-a));
    return EARTH_RADIUS_KM * c;
    };