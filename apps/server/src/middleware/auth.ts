import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '1234567890';

export interface AuthRequest extends Request {
    userId?: string;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if(!authHeader?.startsWith('Bearer ')){
        return res.status(401).json({ error: 'Missing authorization header' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        req.userId = decoded.id;
        next();
    } catch (error){
        return res.status(401).json({ error: 'Invalid token' });
    }
}