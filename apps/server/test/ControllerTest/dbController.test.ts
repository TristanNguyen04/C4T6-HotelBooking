import app from "../../src/index";
import request from "supertest";
import { setupTest , tearDown } from "../helper/setup";
import prisma from '../../src/utils/prismaClient';

describe('Testing Database util functions: Clear Booking Table', ()=>{
    let id: string;
    const originalEnv = process.env.NODE_ENV;
    beforeEach(async ()=>{
        const{ token, userId } = await setupTest();
        id = userId;
    });
    afterEach(async () => {
        await prisma.booking.deleteMany();
        process.env.NODE_ENV = originalEnv;
    });

    test('Clear Booking Table: In Test Env', async ()=>{
        await prisma.booking.create({
            data:{
                userId: id,
                hotelId: "testHotel456",
                hotelName: "TestHotel2",
                checkin: new Date('2025-08-01'),
                checkout: new Date('2025-08-05'),
                guests: "2",
                price: 5432,
                currency: "SGD",
                stripeSessionId: "stripeSession456"
            }
        });
        const found  = await prisma.booking.findMany({
            where: {
                userId:id
            }
        });
        if(!found){fail('Set up failed')};
        const response = await request(app).get('/api/dbutil/clear-bookingtable');
        const found2 = await prisma.booking.findMany({where: {userId: id}});
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Booking table cleared successfully');
        expect(found2.length).toBe(0);
    });

    test('Clear Booking Table: Not in Test Env', async ()=>{
        process.env.NODE_ENV = 'live';
        await prisma.booking.create({
            data:{
                userId: id,
                hotelId: "testHotel456",
                hotelName: "TestHotel2",
                checkin: new Date('2025-08-01'),
                checkout: new Date('2025-08-05'),
                guests: "2",
                price: 5432,
                currency: "SGD",
                stripeSessionId: "stripeSession456"
            }
        });
        const found  = await prisma.booking.findMany({
            where: {
                userId:id
            }
        });
        if(!found){fail('Set up failed')};
        const response = await request(app).get('/api/dbutil/clear-bookingtable');
        const found2 = await prisma.booking.findMany({where: {userId: id}});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Access denied. Only allowed in test environment.');
        expect(found2.length).toBeGreaterThan(0);
    });

    test('Clear Booking Table: Unexpected Error', async ()=>{
        const deleteManySpy = jest.spyOn(prisma.booking, 'deleteMany')
        .mockRejectedValue(new Error('Failed to clear booking table'));
        await prisma.booking.create({
            data:{
                userId: id,
                hotelId: "testHotel456",
                hotelName: "TestHotel2",
                checkin: new Date('2025-08-01'),
                checkout: new Date('2025-08-05'),
                guests: "2",
                price: 5432,
                currency: "SGD",
                stripeSessionId: "stripeSession456"
            }
        });
        const found  = await prisma.booking.findMany({
            where: {
                userId:id
            }
        });
        if(!found){fail('Set up failed')};
        const response = await request(app).get('/api/dbutil/clear-bookingtable');
        const found2 = await prisma.booking.findMany({where: {userId: id}});
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Failed to clear booking table');
        expect(found2.length).toBeGreaterThan(0);
        deleteManySpy.mockRestore();
    })
});

describe('Testing Database util functions: Clear User Table', ()=>{
    let id: string;
    const originalEnv = process.env.NODE_ENV;
    beforeEach(async ()=>{
        const{ token, userId } = await setupTest();
        id = userId;
    });
    afterEach(async () => {
        await prisma.booking.deleteMany();
        process.env.NODE_ENV = originalEnv;
    });

    test('Clear User Table: In Test Env', async ()=>{
        const found  = await prisma.user.findUnique({where: {id:id}});
        if(!found){fail('Set up failed')};
        const response = await request(app).get('/api/dbutil/clear-usertable');
        const found2 = await prisma.booking.findMany({where: {userId: id}});
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('User table cleared successfully');
        expect(found2.length).toBe(0);
    });

    test('Clear User Table: Not In Test Env', async ()=>{
        process.env.NODE_ENV = 'live';
        const found  = await prisma.user.findUnique({where: {id:id}});
        if(!found){fail('Set up failed')};
        const response = await request(app).get('/api/dbutil/clear-usertable');
        const found2 = await prisma.user.findMany({where: {id: id}});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Access denied. Only allowed in test environment.');
        expect(found2.length).toBeGreaterThan(0);
    });
    test('Clear User Table: Unexpected Error', async ()=>{
        const deleteManySpy = jest.spyOn(prisma.user, 'deleteMany')
        .mockRejectedValue(new Error('Failed to clear user table'));
        const found  = await prisma.user.findUnique({where: {id:id}});
        if(!found){fail('Set up failed')};
        const response = await request(app).get('/api/dbutil/clear-usertable');
        const found2 = await prisma.user.findMany({where: {id: id}});
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Failed to clear user table');
        expect(found2.length).toBeGreaterThan(0);
        deleteManySpy.mockRestore();
    });

});

describe('Testing Database util functions: Add verified user to database', ()=>{
    let id: string;
    const originalEnv = process.env.NODE_ENV;
    beforeEach(async ()=>{
        const{ token, userId } = await setupTest();
        id = userId;
    });
    afterEach(async () => {
        await prisma.booking.deleteMany();
        process.env.NODE_ENV = originalEnv;
    });

    test('Add Verified User: In Test Env', async ()=>{
        const res = await request(app)
            .post('/api/dbutil/add-verified-user')
            .query({name: '999' , email:'999@gmail.com' , password: 123456});

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('TEST: Added verified user');
        const user = await prisma.user.findUnique({where: {email: '999@gmail.com'}});
        expect(user).toBeDefined();
    });
    test('Add Verified User: In Test Env - No email', async ()=>{
        const res = await request(app)
            .post('/api/dbutil/add-verified-user')
            .query({name: '999' , password: 123456});
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Error 400');
        const user = await prisma.user.findUnique({where: {email: '999@gmail.com'}});
        expect(user).toBeNull();
    });
    test('Add Verified User: In Test Env - No name', async ()=>{
        const res = await request(app)
            .post('/api/dbutil/add-verified-user')
            .query({email:'999@gmail.com' , password: 123456});
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Error 400');
        const user = await prisma.user.findUnique({where: {email: '999@gmail.com'}});
        expect(user).toBeNull();
        
    });

    test('Add Verified User: Not In Test Env', async ()=>{
        process.env.NODE_ENV = 'live';
        const res = await request(app)
            .post('/api/dbutil/add-verified-user')
            .query({name: '999' , email:'999@gmail.com' , password: 123456});

        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Access denied. Only allowed in test environment.');
        const user = await prisma.user.findUnique({where: {email: '999@gmail.com'}});
        expect(user).toBeNull();
    });

    test('Add Verified User: Unexpected Error', async ()=>{
        const addUniqueSpy = jest.spyOn(prisma.user, 'create')
        .mockRejectedValue(new Error('Error 400'));
        const res = await request(app)
            .post('/api/dbutil/add-verified-user')
            .query({name: '999' , email:'999@gmail.com' , password: 123456});
        expect(res.statusCode).toBe(400);
        expect(res.body.error).toBe('Error 400');
        
        const user = await prisma.user.findUnique({where: {email: '999@gmail.com'}});
        expect(user).toBeNull();
        addUniqueSpy.mockRestore();

    });

})