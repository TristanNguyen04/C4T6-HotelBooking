import jwt from 'jsonwebtoken';
import prisma from '../../src/utils/prismaClient';
import bcrypt from 'bcrypt';

export async function setupTest(){
    await prisma.$connect();
    await prisma.booking.deleteMany();
    await prisma.user.deleteMany();
    const hashedPassword = await bcrypt.hash('hashedpassword', 10);
    
    const testUser = await prisma.user.create({
        data:{
            email: '123@gmail.com',
            password: hashedPassword,
            isVerified: true,
        }
    })
    const JWT_SECRET = process.env.JWT_SECRET || '1234567890';
    const userId = testUser.id;
    console.log('my id', userId)
    const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1d' });

    return {token, userId: testUser.id}
}

export async function tearDown(){
    await prisma.$connect();
    await prisma.booking.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
}