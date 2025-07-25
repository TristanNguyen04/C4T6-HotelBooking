import request from 'supertest';
import app from '../../src/index';
import prisma from '../../src/utils/prismaClient';
import bcrypt from 'bcrypt';

const testUserData = {
  email: 'testuser@example.com',
  password: 'TestPass123!',
  name: 'Test User',
};


describe('Authentication Flow', () => {
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
    expect(res.body.error).toBe('Email already in use');
  });

  // test('Email Verification', async () => {
  //   const register = await request(app).post('/api/auth/register').send(testUserData);
  //   const user = await prisma.user.findUnique({ where: { email: testUserData.email } });

  //   const res = await request(app).get('/api/auth/verify-email').query({ token: user?.verificationToken });

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.message).toBe('Email verified successfully. You can now login.');

  //   const updatedUser = await prisma.user.findUnique({ where: { email: testUserData.email } });
  //   expect(updatedUser?.isVerified).toBe(true);
  // });

  test('Login After Verification', async () => {
    const hashedPassword = await bcrypt.hash(testUserData.password, 10);
    await prisma.user.create({
      data: {
        email: testUserData.email,
        password: hashedPassword,
        name: testUserData.name,
        isVerified: true,
      },
    });

    const res = await request(app).post('/api/auth/login').send({
      email: testUserData.email,
      password: testUserData.password,
    });

    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(testUserData.email);
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
    expect(res.body.isVerified).toBe(true);
  });

  // test('Resend Verification Email', async () => {
  //   await prisma.user.create({
  //     data: {
  //       email: testUserData.email,
  //       password: await bcrypt.hash(testUserData.password, 10),
  //       name: testUserData.name,
  //       isVerified: false,
  //       verificationToken: 'old-token',
  //     },
  //   });

  //   const res = await request(app).post('/api/auth/resend-verification').send({ email: testUserData.email });

  //   expect(res.statusCode).toBe(200);
  //   expect(res.body.message).toBe('Verification email sent successfully');

  //   const updatedUser = await prisma.user.findUnique({ where: { email: testUserData.email } });
  //   expect(updatedUser?.verificationToken).not.toBe('old-token');
  // });
});
