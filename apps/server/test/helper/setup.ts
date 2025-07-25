import jwt from 'jsonwebtoken';
import prisma from '../../src/utils/prismaClient';

export async function setupTest(){
    await prisma.booking.deleteMany();
    await prisma.user.deleteMany();
    const testUser = await prisma.user.create({
        data:{
            email: '123@gmail.com',
            password: 'hashedpassword',
            isVerified: true,
        }
    })
    const JWT_SECRET = process.env.JWT_SECRET || '1234567890';
    const userId = testUser.id;
    const token = jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1d' });

    return {token, userId: testUser.id}
}

export async function tearDown(){
    await prisma.booking.deleteMany();
    await prisma.user.deleteMany();
    await prisma.$disconnect();
}