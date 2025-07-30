import prisma from '../utils/prismaClient';
import { Request, Response } from 'express';

export const clearBookingTable = async (req: Request, res: Response) => {
    if (process.env.NODE_ENV !== 'test') {
        return res.status(400).json({ error: 'Access denied. Only allowed in test environment.' });
    }
    try {
        await prisma.booking.deleteMany();
        res.status(200).json({ message: 'Booking table cleared successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to clear booking table' });
    }
}

export const clearUserTable = async (req: Request , res: Response) =>{
    if(process.env.NODE_ENV !== 'test'){
        return res.status(400).json({error: 'Access denied. Only allowed in test environment.'});
    }
    try{
        await prisma.user.deleteMany();
        res.status(200).json({message: 'User table cleared successfully'});
    }
    catch(error){
        res.status(500).json({error: 'Failed to clear booking table'});
    }
}

export const addVerifiedUser = async (req: Request, res: Response) =>{
    if(process.env.NODE_ENV !== 'test'){
        return res.status(400).json({error: 'Access denied. Only allowed in test environment.'});
    }
    try{
        const {name, email, password} = req.query;
        if(name|| !email || !password){

        }
        await prisma.user.create({
            data: {
            name: name as string,
            email: email as string,
            password: password as string,
            verificationToken: "token123",
            isVerified: true,
            },
        });
        return res.status(200).json({message: 'TEST: Added verified user'});
    }
    catch(error){
        res.status(400).json({error: 'Error 400'});
    }
};

// export const addVerifiedUser = async (req: Request, res: Response) =>{
//     if(process.env.NODE_ENV !== 'test'){
//         return res.status(400).json({error: 'Access denied. Only allowed in test environment.'});
//     }
// }
