import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendVerificationEmail } from '../utils/sendEmail';
<<<<<<< HEAD
import prisma from '../utils/prismaClient';
=======
import { PrismaClient } from '@prisma/client'; // ORM
>>>>>>> 90a67899b19cea727779a85af843410a3706e3ff

const JWT_SECRET = process.env.JWT_SECRET || '1234567890';

export const register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    
    const existing = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if(existing){
        return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString('hex');

    const user = await prisma.user.create({
        data: { email, password: hashedPassword, name, verificationToken}
    });

    await sendVerificationEmail(email, verificationToken);
    
    res.json({ message: 'Registration successful. Please check your email to verify your account.'});
}

export const verifyEmail = async (req: Request, res: Response) => {
    const { token } = req.query;
    if(!token || typeof token !== 'string'){
        return res.status(400).json({ error: 'Missing token' });
    }

    const user = await prisma.user.findFirst({
        where: {
            verificationToken: token
        }
    })

    if(!user){
        return res.status(400).json({ error: 'Invalid or expired token' });
    }

    await prisma.user.update({
        where: { id: user.id },
        data: { isVerified: true, verificationToken: null }
    });

    res.json({ message: 'Email verified successfully. You can now login.' });
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if(!user){
        return res.status(401).json({ error: 'Please sign up first!'});
    }

    if(!user.isVerified){
        return res.status(400).json({ error: 'Please verify your email first!'});
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match){
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name}});
}

export const resendVerificationEmail = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
        where: { email }
    });

    if(!user){
        return res.status(404).json({ error: 'User not found' });
    }

    if(user.isVerified){
        return res.status(400).json({ error: 'Email is already verified' });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    
    await prisma.user.update({
        where: { id: user.id },
        data: { verificationToken }
    });

    await sendVerificationEmail(email, verificationToken);
    
    res.json({ message: 'Verification email sent successfully' });
}

export const checkVerificationStatus = async (req: Request, res: Response) => {
    const { email } = req.query;
    
    if(!email || typeof email !== 'string'){
        return res.status(400).json({ error: 'Email is required' });
    }

    const user = await prisma.user.findUnique({
        where: { email },
        select: { isVerified: true }
    });

    if(!user){
        return res.status(404).json({ error: 'User not found' });
    }

    res.json({ isVerified: user.isVerified });
}