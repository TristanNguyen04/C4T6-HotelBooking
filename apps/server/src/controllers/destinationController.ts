import { Request, Response } from "express";
import fs from "fs";
import path from 'path';
import Fuse from 'fuse.js';
import { Destination } from "../models/Destination";

const destinationsFile = path.join(__dirname, '../../data/destinations.json');
const destinations: Destination[] = JSON.parse(fs.readFileSync(destinationsFile, 'utf-8'));

// Configure Fuse.js options for optimal search
const fuseOptions = {
    keys: ['term', 'state'],
    threshold: 0.3, 
    includeScore: true,
    includeMatches: true, 
    minMatchCharLength: 2, 
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