import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { sendVerificationEmail } from '../utils/sendEmail';
import { AuthRequest } from '../middleware/auth';
import prisma from '../utils/prismaClient';

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

    // Return nice HTML instead of JSON
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const htmlResponse = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verified - Ascenda Hotels</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-50 min-h-screen flex items-center justify-center">
        <div class="text-center max-w-md mx-auto px-4">
            <div class="bg-green-100 text-green-600 p-8 rounded-lg mb-6">
                <div class="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 class="text-2xl font-bold mb-2">Email Verified Successfully! 🎉</h2>
                <p>Your account has been verified. You can now sign in and start booking amazing hotels!</p>
            </div>
            <div class="space-y-3">
                <a href="${frontendUrl}/login" class="block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-decoration-none">
                    Sign In Now
                </a>
                <a href="${frontendUrl}/" class="block w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors text-decoration-none">
                    Browse Hotels
                </a>
            </div>
        </div>
    </body>
    </html>
    `;
    
    res.send(htmlResponse);
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
    res.json({ 
        token, 
        user: { 
            id: user.id, 
            email: user.email, 
            name: user.name,
            isVerified: user.isVerified 
        }
    });
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

export const getProfile = async (req: AuthRequest, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
                isVerified: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        const { name } = req.body;

        if (!name || name.trim().length === 0) {
            return res.status(400).json({ error: 'Name is required' });
        }

        const user = await prisma.user.update({
            where: { id: req.userId },
            data: { name: name.trim() },
            select: {
                id: true,
                email: true,
                name: true,
                isVerified: true
            }
        });

        res.json({ 
            message: 'Profile updated successfully',
            user 
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

export const changePassword = async (req: AuthRequest, res: Response) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: 'Current password and new password are required' });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ error: 'New password must be at least 6 characters long' });
        }
        const user = await prisma.user.findFirst({
            where: { id: req.userId },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isCurrentPasswordValid) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: req.userId },
            data: { password: hashedNewPassword }
        });

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ error: 'Failed to change password' });
    }
};

export const deleteAccount = async (req: AuthRequest, res: Response) => {
    try {
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password is required to delete account' });
        }

        const user = await prisma.user.findFirst({
            where: { id: req.userId }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // Delete the user (bookings will be cascade deleted due to schema)
        await prisma.user.delete({
            where: { id: req.userId }
        });

        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({ error: 'Failed to delete account' });
    }
};

// export const getUID = async (req: Request, res: Response)=>{
//     const { email } = req.query;
//     if(!email || typeof email !== 'string'){
//         return res.status(400).json({error: 'Invalid Parameter'});
//     }

//     const user = await prisma.user.findFirst({
//         where: {email : email}
//     })
//     console.log(JSON.stringify(user));
//     res.json({token: user?.verificationToken});
// }
//     const user = await prisma.user.findFirst({
//         where: {email : email}
//     })
//     if(!user){
//         return res.status(400).json({error: 'User not found'});
//     }
//     res.json({token: user?.verificationToken});
// }
