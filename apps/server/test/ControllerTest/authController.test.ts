import request from 'supertest';
import app from '../../src/index';
import prisma from '../../src/utils/prismaClient';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { setupTest, tearDown } from '../helper/setup';

const JWT_SECRET = process.env.JWT_SECRET || '1234567890';
const testUserData = {
  email: 'testuser@example.com',
  password: 'TestPass123!',
  name: 'Test User',
};

// Registration Test Suite
describe('Registration Flow', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });
  
  afterAll(async () => {
    await prisma.user.deleteMany();
  });
  test('User Registration', async () => {
    const res = await request(app).post('/api/auth/register').send(testUserData);

    expect(res.body.message).toContain('Registration successful. Please check your email to verify your account.');
    
    const user = await prisma.user.findUnique({ where: { email: testUserData.email } });
    expect(res.statusCode).toBe(200);
    expect(user).toBeDefined();
    expect(user?.name).toEqual('Test User');
    expect(user?.isVerified).toEqual(false);
    expect(user?.email).toEqual('testuser@example.com');
    expect(user?.verificationToken).toBeDefined();
  });

  test('Duplicate Email Registration', async () => {
    await request(app).post('/api/auth/register').send(testUserData);
    const res = await request(app).post('/api/auth/register').send(testUserData);

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual('Email already in use');
  });
});

// Email Verification Test Suite
describe('Email Verification', ()=>{
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });
  
  afterAll(async () => {
    await prisma.user.deleteMany();
  });
  test('Email Verification Successful', async () => {
    await request(app).post('/api/auth/register').send(testUserData);
    const user = await prisma.user.findUnique({ where: { email: testUserData.email } });

    const res = await request(app).get('/api/auth/verify-email').query({ token: user?.verificationToken });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toEqual('Email verified successfully. You can now login.');

    const updatedUser = await prisma.user.findUnique({ where: { email: testUserData.email } });
    expect(updatedUser?.isVerified).toBe(true);
  });

  test('Email Verification: Invalid or Expired Token', async () => {
    const user = await prisma.user.findUnique({ where: { email: testUserData.email } });
    const res = await request(app).get('/api/auth/verify-email').query({ token: 'fake-token' });

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual('Invalid or expired token');

  });

  test('Email Verification: Missing Token', async () => {
    const res = await request(app).get('/api/auth/verify-email').query({});

    expect(res.statusCode).toBe(400);
    expect(res.body.error).toEqual('Missing token');
  });
});

// Log in Test Suite
describe('Log In Flow',()=>{
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });
  
  afterAll(async () => {
    await prisma.user.deleteMany();
  });
  test('Log in successfully', async ()=>{
    await request(app).post('/api/auth/register').send(testUserData);
    await prisma.user.update({
      where: { email: testUserData.email },
      data: { isVerified: true }
    });
    const res = await request(app).post('/api/auth/login').send(testUserData);
    const user = await prisma.user.findUnique({where: {email: testUserData.email}});
    const token = jwt.sign({ id:user?.id  }, JWT_SECRET, { expiresIn: '1d' });
    expect(res.body).toEqual({token, user: {id: user?.id , email: user?.email , name: user?.name, isVerified: true }});
  });

  test('Log in Error: Sign Up first', async ()=>{
    const res = await request(app).post('/api/auth/login').send(testUserData);
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({error: 'Please sign up first!'});
  });

  test('Log in Error: Verify email first', async ()=>{
    await request(app).post('/api/auth/register').send(testUserData);
    const res = await request(app).post('/api/auth/login').send(testUserData);
    expect(res.body).toEqual({error: 'Please verify your email first!'});
    expect(res.statusCode).toBe(400);
  });

  test('Log in Error: Wrong Password', async ()=>{
    await request(app).post('/api/auth/register').send(testUserData);
    await prisma.user.update({
      where: { email: testUserData.email },
      data: { isVerified: true }
    });
    const res = await request(app).post('/api/auth/login')
      .send({email:'testuser@example.com', password: 'fake123'});
      expect(res.body).toEqual({error: 'Invalid credentials'});
      expect(res.statusCode).toBe(401);
  });
});

// Resend Email Verification Test Suite
describe('Resend Email Verification Flow', ()=>{
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });
  
  afterAll(async () => {
    await prisma.user.deleteMany();
  });

  test('Resend Verification Email', async () => {
    await request(app).post('/api/auth/register').send(testUserData);
    const res = await request(app).post('/api/auth/resend-verification').send({ email: testUserData.email });

    expect(res.body.message).toEqual('Verification email sent successfully');
    expect(res.statusCode).toBe(200);
  },10000);

  test('Resend Verification : User not found', async ()=>{
    const res = await request(app).post('/api/auth/resend-verification').send({ email: testUserData.email });
    expect(res.body.error).toEqual('User not found');
    expect(res.statusCode).toBe(404);
  });

  test('Resend Verification : Email is verified', async ()=>{
    await request(app).post('/api/auth/register').send(testUserData);
    await prisma.user.update({
      where: {email : testUserData.email},
      data: {isVerified: true},
    });
    const res = await request(app).post('/api/auth/resend-verification').send({email:testUserData.email});
    expect(res.body.error).toEqual('Email is already verified');
    expect(res.statusCode).toBe(400);
  })
});

// Check Verification Test Suite
describe('Check Verification Status', ()=>{
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });
  
  afterAll(async () => {
    await prisma.user.deleteMany();
  });
  test('Check Verification Status: Verified', async () => {
    await prisma.user.create({
      data: {
        email: testUserData.email,
        password: await bcrypt.hash(testUserData.password, 10),
        name: testUserData.name,
        isVerified: true,
      },
    });

    const res = await request(app).get('/api/auth/check-verification').query({ email: testUserData.email });
    expect(res.statusCode).toBe(200);
    expect(res.body.isVerified).toEqual(true);
  });

  test('Check Verification Status: Email is required', async()=>{
    const res = await request(app).get('/api/auth/check-verification').query({});
    expect(res.body.error).toEqual('Email is required');
    expect(res.statusCode).toBe(400);
  });

  test('Check Verification Status: User not found', async()=>{
    const res = await request(app).get('/api/auth/check-verification').query({email : 'unregistered@email.com'});
    expect(res.body.error).toEqual('User not found');
    expect(res.statusCode).toBe(404);
  });
});

describe('Get Profile', ()=>{
  let userId: string;
  let token: string;
  beforeAll(async () => {
    const user = await setupTest();
    userId = user.userId;
    token = user.token;
  });
  
  afterAll(async()=>{
    await tearDown();
  });

  test('Get Profile Successfully', async()=>{
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('user');
    expect(res.body.user).toMatchObject({
      id: userId,
      email: '123@gmail.com',
      name: null,
      createdAt: expect.any(String), // may be ISO string, not Date
      isVerified: true
    });
  });

  test('Get Profile : User not found', async()=>{
    const fakeUserId = 'non-existent-user-id';
    const token = jwt.sign({ id: fakeUserId }, JWT_SECRET!, {
      expiresIn: '1h'
    });
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toBe('User not found');
  });

  test('Get Profile : Unexpected Error', async()=>{
    const spy = jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('Error'));
    const res = await request(app)
      .get('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)

    expect(res.statusCode).toBe(500);
    expect(res.body.error).toBe('Failed to fetch profile');
  });
})

describe('Update Profile', ()=>{
  let userId: string;
  let token: string;
  beforeAll(async () => {
    const user = await setupTest();
    userId = user.userId;
    token = user.token;
  });
  
  afterAll(async()=>{
    await tearDown();
  });
  test('Update Profile Successfully', async ()=>{
    const res = await request(app)
      .patch('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)  // add valid token
      .send({ name: 'New Name' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      message: 'Profile updated successfully',
      user: {
        id: userId,
        email: '123@gmail.com',
        name: 'New Name',
        isVerified: true,
      },
    });
  });
  test('Update Profile : Name is required', async ()=>{
    const res = await request(app)
      .patch('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: '      ' });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: 'Name is required' });
  });
  test('Update Profile : Unexpected Error', async ()=>{
    const spy = jest.spyOn(prisma.user, 'update').mockRejectedValue(new Error('error'));
    const res = await request(app)
      .patch('/api/auth/profile')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: '123' });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: 'Failed to update profile' });
    spy.mockRestore();
  });
})

// describe('Change Password', ()=>{
//   let userId: string;
//   let token: string;
//   beforeAll(async () => {
//     const user = await setupTest();
//     userId = user.userId;
//     token = user.token;
//   });
  
//   afterAll(async()=>{
//     await tearDown();
//   });

//   test('Update Password Successfully', async () => {
//     const res = await request(app)
//       .patch('/api/auth/change-password')
//       .set('Authorization', `Bearer ${token}`)
//       .send({
//         currentPassword: 'hashedpassword',
//         newPassword: 'newHashedPassword'
//       });

//       expect(res.body).toEqual({ message: 'Password changed successfully' });
//       expect(res.statusCode).toBe(200);
//   });
// })
// describe('Test getUID', ()=>{
//   let userId: string;
//   let token: string;
//   beforeAll(async () => {
//     const user = await setupTest();
//     userId = user.userId;
//     token = user.token;
//   });

//   test('getUID successfully', async()=>{
//     const res = await request(app).get('/api/auth/get-uid').query('123@gmail.com');
//     expect(res.statusCode).toBe(200);
//     expect(res.body).toHaveProperty('token');
//     expect(typeof res.body.token).toBe('string');
//   })
// })
