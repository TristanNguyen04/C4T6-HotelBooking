"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDistance = void 0;
const calculateDistance = (lat1, lng1, lat2, lng2) => {
    if (-90 > lat1 || lat1 > 90 || lng1 > 180 || lng1 < -180 ||
        -90 > lat2 || lat2 > 90 || lng2 > 180 || lng2 < -180) {
        throw new Error('Invalid latitude or longitude values');
    }
    const EARTH_RADIUS_KM = 6371;
    const toRadian = (degrees) => degrees * Math.PI / 180;
    const dLat = toRadian(lat2 - lat1);
    const dLng = toRadian(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return EARTH_RADIUS_KM * c;
};
exports.calculateDistance = calculateDistance;
