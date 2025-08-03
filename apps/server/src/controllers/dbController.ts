import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma , { fuzzPrisma } from '../utils/prismaClient';

interface PrismaRequest extends Request {
  prisma: PrismaClient;
}


export const clearBookingTable = async (req: PrismaRequest, res: Response) => {
    if (process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'jest') {
        return res.status(400).json({ error: 'Access denied. Only allowed in test environment.' });
    }
    try {
        await req.prisma.booking.deleteMany();
        res.status(200).json({ message: 'Booking table cleared successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to clear booking table' });
    }
}

export const clearUserTable = async (req: PrismaRequest , res: Response) =>{
    if(process.env.NODE_ENV !== 'test' && process.env.NODE_ENV !== 'jest'){
        return res.status(400).json({error: 'Access denied. Only allowed in test environment.'});
    }
    try{
        await req.prisma.user.deleteMany();
        res.status(200).json({message: 'User table cleared successfully'});
    }
    catch(error){
        res.status(500).json({error: 'Failed to clear user table'});
    }
}

export const addVerifiedUser = async (req: PrismaRequest, res: Response) =>{
    const isTestEnv = process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'jest';
    const isFuzzing = req.prisma === fuzzPrisma;

    if (!isTestEnv && !isFuzzing) {
        return res.status(403).json({ error: 'Access denied: only allowed in fuzzing or test environment' });
    }
    try{
        const client = req.prisma || (isTestEnv ? prisma : null);
        const {name, email, password} = req.body;
        if(!name|| !email || !password){
            console.log('missing param')
            throw new Error('Missing Parameters');
        }
        const hashedPassword = await bcrypt.hash(String(password), 10);
        const user = await prisma.user.create({
            data: {
            name: name as string,
            email: email as string,
            password: hashedPassword as string,
            verificationToken: "token123",
            isVerified: true,
            },
        });
        console.log(user);
        return res.status(200).json({message: 'TEST: Added verified user'});
    }
    catch(error){
        res.status(400).json({error: 'Error 400'});
    }
};
