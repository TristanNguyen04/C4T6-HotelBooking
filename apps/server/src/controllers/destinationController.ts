import { Request, Response } from "express";
import fs from "fs";
import path from 'path';
import Fuse from 'fuse.js';
import { Destination } from "../models/Destination";
import { calculateDistance } from "../utils/calculateDistance";

const destinationsFile = path.join(__dirname, '../../data/destinations.json');
const destinations: Destination[] = JSON.parse(fs.readFileSync(destinationsFile, 'utf-8'));

    
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
const fuse = new Fuse(destinations, fuseOptions);

export const searchDestinations = (req: Request, res: Response) => {
    const query = (req.query.query as string)?.trim();

    if (!query) {
        return res.status(400).json({ error: 'Missing query parameter' });
    }

    const searchResults = fuse.search(query, {limit: 10});

    const matches = searchResults.map(result => result.item);

    return res.json(matches);
}

export const searchLocationRadius = (req:Request, res:Response) => {
    const lat = parseFloat(req.query.lat as string);
    const lng = parseFloat(req.query.lng as string);
    const radiusKm = parseFloat(req.query.radius as string);
    if (isNaN(lat) || isNaN(lng) || isNaN(radiusKm)) {
        return res.status(400).json({ error: "Invalid params" });
    }
    try{
        const nearbyDest = destinations.filter(dest => {
            const distance = calculateDistance(lat, lng, dest.lat, dest.lng);
            return distance <= radiusKm;
        });
        return res.json(nearbyDest);
    }
    catch(err:any){
        if(err.message === "Invalid latitude or longitude values"){
            return res.status(400).json({error: err.message});
        }
        return res.status(500).json({error: "Internal Server Error"});
    }
}
