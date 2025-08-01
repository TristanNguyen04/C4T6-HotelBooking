"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchLocationRadius = exports.searchDestinations = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fuse_js_1 = __importDefault(require("fuse.js"));
const calculateDistance_1 = require("../utils/calculateDistance");
const destinationsFile = path_1.default.join(__dirname, '../../data/destinations.json');
const destinations = JSON.parse(fs_1.default.readFileSync(destinationsFile, 'utf-8'));
const fuseOptions = {
    keys: ['term', 'state'],
    threshold: 0.3,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 1,
    shouldSort: true,
    findAllMatches: false,
    location: 0,
    distance: 100,
    useExtendedSearch: false,
    ignoreLocation: false,
    ignoreFieldNorm: false,
};
const fuse = new fuse_js_1.default(destinations, fuseOptions);
const searchDestinations = (req, res) => {
    var _a;
    const query = (_a = req.query.query) === null || _a === void 0 ? void 0 : _a.trim();
    if (!query) {
        return res.status(400).json({ error: 'Missing query parameter' });
    }
    const searchResults = fuse.search(query, { limit: 10 });
    const matches = searchResults.map(result => result.item);
    return res.json(matches);
};
exports.searchDestinations = searchDestinations;
const searchLocationRadius = (req, res) => {
    const lat = parseFloat(req.query.lat);
    const lng = parseFloat(req.query.lng);
    const radiusKm = parseFloat(req.query.radius);
    if (isNaN(lat) || isNaN(lng) || isNaN(radiusKm)) {
        return res.status(400).json({ error: "Invalid params" });
    }
    try {
        const nearbyDest = destinations.filter(dest => {
            const distance = (0, calculateDistance_1.calculateDistance)(lat, lng, dest.lat, dest.lng);
            return distance <= radiusKm;
        });
        return res.json(nearbyDest);
    }
    catch (err) {
        if (err.message === "Invalid latitude or longitude values") {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
exports.searchLocationRadius = searchLocationRadius;
