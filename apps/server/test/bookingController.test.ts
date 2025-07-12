import prisma from '../src/utils/prismaClient';
import app from '../src/index';
import request from 'supertest';
import { createBookingRecord } from '../src/services/bookingService';

jest.mock('../src/utils/prismaClient',()=>({
    booking: {
        create: jest.fn(),
        findMany: jest.fn(),
    },
    user: {
        findUnique: jest.fn(),
        findFirst: jest.fn(),
        create: jest.fn(),
    }
}));

jest.mock('../src/services/bookingService');

jest.mock('../src/middleware/auth', () => ({
    authenticate: (req: any, res: any, next: any) => {
        req.userId = '123';
        next();
    },
}));

const booking = {
    hotelId: '456',
    hotelName: 'Marina Bay Sands',
    checkin: '25-05-2025',
    checkout: '28-05-2025',
    guests: '2',
    price: 1200000,
    currency: 'sgd',
    sessionId: '1234567890',
}

const mockBookings = [
    {
    id: 1,
    userId: '123',
    hotelName: 'Marina Bay Sands',
    checkin: '25-05-2025',
    checkout: '28-05-2025',
    guests: 2,
    price: 1200000,
    currency: 'sgd',
    sessionId: 'sess_abc123',
    createdAt: '01-01-2025',
    },
];

describe('POST /api/bookings', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    })

    // Test 1
    test('Test createBooking', async ()=>{
        (createBookingRecord as jest.Mock).mockResolvedValueOnce({...booking, userId: '123'});

        const res = await request(app)
            .post('/api/bookings')
            .send(booking);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({...booking, userId:'123'})
    });

    
})

describe('POST /api/bookings - Unauthorized', () => {
    beforeAll(() => {
        // Clears previously loaded modules
        jest.resetModules();
        jest.doMock('../src/middleware/auth', () => ({
            authenticate: (req: any, res: any, next: any) => {
            next();
            },
        }));
    });

    test('User is unauthorized', async () => {
        // Re-import app after mocking
        const app = require('../src/index').default;
        const res = await request(app)
        .post('/api/bookings')
        .send(booking);

        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized' });
    });
});

describe('POST /api/bookings/me', ()=>{
    beforeAll(() => {
        // Clears previously loaded modules
        jest.resetModules();
        jest.mock('../src/middleware/auth', () => ({
        authenticate: (req: any, res: any, next: any) => {
            req.userId = '123';
            next();
        },
    }));
    
});
    // Test 1
    test('Retrieve Bookings', async ()=>{
        const mockFindMany = prisma.booking.findMany as jest.Mock;
        mockFindMany.mockResolvedValueOnce(mockBookings);
        const res = await request(app).get('/api/bookings/me');

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual(mockBookings);
    })

});


describe('POST /api/bookings/me - Unauthorized', ()=>{
    beforeAll(() => {
        // Clears previously loaded modules
        jest.resetModules();
        jest.mock('../src/middleware/auth', () => ({
        authenticate: (req: any, res: any, next: any) => {
            next();
        },
    }));
    
});
    // Test 1
    test('Retrieve Bookings', async ()=>{
        // Newly mocked middleware
        const app = require('../src/index').default;
        const mockFindMany = prisma.booking.findMany as jest.Mock;
        mockFindMany.mockResolvedValueOnce(mockBookings);
        const res = await request(app).get('/api/bookings/me');

        expect(res.statusCode).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized' });
    })

});