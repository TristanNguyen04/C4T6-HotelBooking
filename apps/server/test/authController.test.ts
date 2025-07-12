import request from 'supertest';
import { sendVerificationEmail } from '../src/utils/sendEmail';
import app from '../src/index';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../src/utils/prismaClient';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

jest.mock('../src/utils/sendEmail', () => ({
  sendVerificationEmail: jest.fn(),
}));


// Mock prisma client
jest.mock('../src/utils/prismaClient',()=>({
    user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        findFirst: jest.fn(),
        update: jest.fn()
    }
}));

const testData = {
    email: 'test123@gmail.com',
    password: '1234567890',
    name: 'testUser123'
};

const user = {
    password: 'password',
    email: 'test123@gmail.com',
    name: 'testUser123',
    id: '123',
    createdAt: '23-05-2025',
    isVerified: false,
    verificationToken: 'valid-token',
}


describe('POST /auth/register', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    // Test 1
    test('Register Successful', async () => {
        (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
        (bcrypt.hash as jest.Mock).mockResolvedValueOnce('hashedpassword');
        (prisma.user.create as jest.Mock).mockResolvedValueOnce({
            id: '123',
            email: user.email,
            password: 'hashedpassword',
            name: user.name,
            verificationToken: 'mocked-token',
            isVerified: false,
            createdAt: new Date(),
        });
        (sendVerificationEmail as jest.Mock).mockResolvedValueOnce(undefined);

        const res = await request(app)
            .post('/api/auth/register')
            .send({ email: user.email, password: 'hashedpassword', name: user.name });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: 'Registration successful. Please check your email to verify your account.' });
        expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: user.email } });
        expect(bcrypt.hash).toHaveBeenCalledWith('hashedpassword', 10);
        expect(prisma.user.create).toHaveBeenCalled();
    });

    // Test 2
    test('Email in Use', async ()=>{
        const mockUnique = prisma.user.findUnique as jest.Mock;
        mockUnique.mockResolvedValueOnce('test123@gmail.com');

        const res = await request(app)
            .post('/api/auth/register')
            .send(testData)
        
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({error: 'Email already in use'});

    });
})

const mockedUser = {
  id: 1,
  email: 'test@example.com',
  verificationToken: 'valid-token',
  isVerified: false,
};

describe('GET verifyEmail', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    })

    // Test 1
    test('Token Receieved', async ()=>{
        const mockFindFirst = prisma.user.findFirst as jest.Mock;
        mockFindFirst.mockResolvedValueOnce(mockedUser);
        
        const mockUpdate = prisma.user.update as jest.Mock;
        mockUpdate.mockResolvedValueOnce({...mockedUser , isVerified: true});
        
        const res = await request(app)
            .get('/api/auth/verify-email')
            .query({token: 'valid-token'});

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: 'Email verified successfully. You can now login.'});
        expect(mockFindFirst).toHaveBeenLastCalledWith({where: {verificationToken: 'valid-token'}});
        expect(mockUpdate).toHaveBeenCalledWith({
            where: {id: mockedUser.id},
            data: {isVerified: true, verificationToken: null}
        });
    })

    // Test 2
    test('Token Missing' , async ()=>{
        const res = await request(app)
            .get('/api/auth/verify-email');

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({error: 'Missing token'});
    });

    // Test 3
    test('Expired or Invalid Token', async ()=>{
        const mockFindFirst = prisma.user.findFirst as jest.Mock;
        mockFindFirst.mockResolvedValueOnce(null);

        const res = await request(app)
            .get('/api/auth/verify-email')
            .query({token: 'invalid-token'});
        
            expect(res.statusCode).toBe(400);
            expect(res.body).toEqual({error: 'Invalid or expired token'});
    })

})

describe('POST /auth/login', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });
    
    // Test 1
    test('Login Successful', async ()=>{
        const mockUnique = prisma.user.findUnique as jest.Mock;
        mockUnique.mockResolvedValueOnce({...user, isVerified: true});
        (bcrypt.compare as jest.Mock).mockResolvedValueOnce(true);
        (jwt.sign as jest.Mock).mockReturnValueOnce('test-token');


        const res = await request(app)
            .post('/api/auth/login')
            .send({email: user.email ,password: 'hashedpassword'});

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ token: 'test-token', user: { id: user.id, email: user.email, name: user.name}});
        expect(mockUnique).toHaveBeenCalledWith({
            where: {email: user.email}
        });

        expect(bcrypt.compare).toHaveBeenCalledWith('hashedpassword', user.password);
        expect(jwt.sign).toHaveBeenCalledWith({id: user.id}, expect.any(String) , {expiresIn: '1d'});

    });

    // Test 2
    test('User did not signup', async ()=>{

        const mockFindUnique = prisma.user.findUnique as jest.Mock;
        mockFindUnique.mockResolvedValueOnce(null);

        const res = await request(app)
            .post('/api/auth/login')
            .send(user);

        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({error: 'Please sign up first!'});

    });
    // Test 3
    test('User not verified', async ()=>{
        const mockFindUnique = prisma.user.findUnique as jest.Mock;
        mockFindUnique.mockReturnValueOnce(user);

        const res = await request(app)
            .post('/api/auth/login')
            .send({email: user.email, password: 'hashedpassword'});

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({error: 'Please verify your email first!'});

    });

    // Test 5
    test('User keyed in invalid credentials', async ()=>{
        const mockFindUnique = prisma.user.findUnique as jest.Mock;
        mockFindUnique.mockResolvedValueOnce({...user, isVerified: true});
        (bcrypt.compare as jest.Mock).mockResolvedValueOnce(false);

        const res = await request(app)
            .post('/api/auth/login')
            .send({email: user.email, password: 'hashedpassword'});
        
        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({error: 'Invalid credentials'});

        expect(bcrypt.compare).toHaveBeenCalledWith('hashedpassword', user.password);
    });
})

describe('POST /auth/resend-verification', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    })

    // Test 1
    test('Verification send Successfully', async ()=>{

        (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(user);
        (prisma.user.update as jest.Mock).mockResolvedValueOnce({...user, verificationToken:'new-token'});
        (sendVerificationEmail as jest.Mock).mockResolvedValueOnce(undefined);
        const res = await request(app)
            .post('/api/auth/resend-verification')
            .send({email: user.email});

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({message: 'Verification email sent successfully'});
        expect(prisma.user.update).toHaveBeenCalledWith({
            where: { id: user.id },
            data: { verificationToken: expect.any(String) }
        });

        expect(sendVerificationEmail).toHaveBeenCalledWith(
            user.email,
            expect.any(String)
        );

    });

    // Test 2
    test('User not found', async ()=>{
        (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
        
        const res = await request(app)
            .post('/api/auth/resend-verification')
            .send({email: user.email});


        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: 'User not found' });
    });
    // Test 3
    test('Email already verified', async ()=>{
        (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({...user, isVerified: true});
        
        const res = await request(app)
            .post('/api/auth/resend-verification')
            .send({email: user.email});


        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'Email is already verified' });
    });
});

describe('GET /api/auth/check-verification',()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    // Test 1
    test('Check Verification Successful: Verified',async ()=>{
        (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce({...user, isVerified: true});
        const res = await request(app)
            .get('/api/auth/check-verification')
            .query({email: user.email});

        expect(res.statusCode).toBe(200);
        expect(res.body.isVerified).toBe(true);
    });

    // Test 2
    test('Check Verification Successful: Not Verified',async ()=>{
        (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(user);
        const res = await request(app)
            .get('/api/auth/check-verification')
            .query({email: user.email});

        expect(res.statusCode).toBe(200);
        expect(res.body.isVerified).toBe(false);
    });

    // Test 2
    test('No email || Email is not a string',async ()=>{
        const res = await request(app)
            .get('/api/auth/check-verification')
            .query({email: null});
        
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'Email is required' })
    });

    // Test 3
    test('User not found',async ()=>{
        (prisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
        const res = await request(app)
            .get('/api/auth/check-verification')
            .query({email: user.email});

        expect(res.statusCode).toBe(404);
        expect(res.body).toEqual({ error: 'User not found' });
    })


})


