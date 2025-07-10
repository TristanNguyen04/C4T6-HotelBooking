// apps/server/test/paymentController.test.ts

import request from 'supertest';
import app from '../src/index';
import stripe from '../src/utils/stripeClient';
import { PrismaClient } from '@prisma/client';
import { mock } from 'node:test';

// mock the stripe client
jest.mock('../src/utils/stripeClient',()=>({
    checkout: {
        sessions: {
            create: jest.fn(),
            retrieve: jest.fn(),
        },
    },
}));

const item = {
    name: "Marina Bay Sands - 6D5N - 05/05 to 11/05",
    hotelId: "hotel1",
    hotelName: "Marina Bay Sands",
    checkin: "2025-05-05",
    checkout: "2025-05-11",
    guests: 2,
    currency: "sgd",
    price: 1200000,
    quantity: 1,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUgw1QcpVM_ETgHLuSxL9GMVLXULvNq4ePDg&s"
};


describe('POST /payment/checkout', ()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    const mockURL = 'https://mockstripe.com/session';
    const mockStripe = stripe.checkout.sessions.create as jest.Mock;
    mockStripe.mockResolvedValueOnce({
        url: mockURL,
    });

    // Test 1:
    test('Receive Post Request | Create Stripe Checkout Session', async ()=>{
        const res = await request(app)
            // make post request to createCheckOutSession
            .post('/payment/checkout')
            .send({
                userId: 'testUser123',
                items: [item]
            });
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({url: mockURL});
        expect(mockStripe).toHaveBeenCalledTimes(1);

    });

    // Test 2:
    test('No UserID', async ()=>{
        const res = await request(app)
            .post('/payment/checkout')
            .send({
                items: [item]
            });
        
        expect(res.statusCode).toBe(400);
        expect(mockStripe).toHaveBeenCalledTimes(0);
    })

    // Test 3:
    test('No item', async ()=>{
        const res = await request(app)
            .post('/payment/checkout')
            .send({
                userId: 'testUser123',
                items: []
            });
        
        expect(res.statusCode).toBe(400);
        expect(mockStripe).toHaveBeenCalledTimes(0);
    })

    // Test 4:
    test('API Error -> Error 500', async ()=>{
        mockStripe.mockRejectedValueOnce(new Error('Stripe API Error'));

        const res = await request(app)
            .post('/payment/checkout')
            .send({
                userId: 'testUser123',
                items: [item]
            });
        
        expect(res.statusCode).toBe(500);
        expect(mockStripe).toHaveBeenCalledTimes(1);
    })
});


jest.mock('@prisma/client', ()=>{
    const prisma = {
        user: {
            findUnique: jest.fn(),
            create: jest.fn(),
        },
        booking: {
            findFirst: jest.fn(),
            create: jest.fn(),
        }
    }
    return { PrismaClient: jest.fn(()=> prisma)};
})

const metaData = {
    userId: 'testUser123',
    bookings: JSON.stringify([
        {
            hotelId: 'hotel1',
            hotelName: 'Marina Bay Sands',
            checkin: '2025-05-05',
            checkout: '2025-05-11',
            guests: '2',
            price: 1200000,
            currency: 'sgd'
        }
    ])
};

describe('POST /payment/success', ()=>{
  beforeEach(() => {
    jest.clearAllMocks();

    // get the mocked prisma instance
    const prisma = new PrismaClient() as any;

    // Mock Prisma calls your controller uses
    prisma.user.findUnique.mockResolvedValue(null); // simulate user not found, so create runs
    prisma.user.create.mockResolvedValue({ id: 'testUser123' });
    prisma.booking.findFirst.mockResolvedValue(null); // no existing booking
    prisma.booking.create.mockResolvedValue({}); // booking created successfully
  });

    const mockURL = 'https://mockstripe.com/session';
    const mockRetrieve = stripe.checkout.sessions.retrieve as jest.Mock;

    // Test 1
    test('Payment Success', async ()=>{

        mockRetrieve.mockResolvedValueOnce({
            payment_status: 'paid',
            metadata: metaData,
        });
        const res = await request(app)
            .post('/payment/success')
            .send({sessionId: '1234' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({message: "Booking created successfully"})
    })

    // Test 2
    test('Payment Unsuccessful', async ()=>{

        mockRetrieve.mockResolvedValueOnce({
            payment_status: 'not_paid',
            metadata: metaData
        });
        const res = await request(app)
            .post('/payment/success')
            .send({sessionId: '1234' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({error: "Payment not completed"})
    })

    // Test 3
    test('No MetaData', async ()=>{

        mockRetrieve.mockResolvedValueOnce({
            payment_status: 'paid',
            metadata: {}
        });
        const res = await request(app)
            .post('/payment/success')
            .send({sessionId: '1234' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({error: "Missing booking information in session metadata"})
    })

    // Test 4
    test('No UserId', async ()=>{
        const { userId, ...modifiedMetaData } = metaData;       
        mockRetrieve.mockResolvedValueOnce({
            payment_status: 'paid',
            metadata: modifiedMetaData
        });
        const res = await request(app)
            .post('/payment/success')
            .send({sessionId: '1234' });
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({error: "Missing booking information in session metadata"})
    })

    // Test 5
    test('Booking Exist', async ()=>{
        mockRetrieve.mockResolvedValueOnce({
            payment_status: 'paid',
            metadata: metaData
        });
        const prisma = new PrismaClient();
        
        const mockFindFirst = prisma.booking.findFirst as jest.Mock;
        mockFindFirst.mockResolvedValueOnce({
            id: 'existingBookingId', // some mock booking data
            userId: 'testUser123',
            stripeSessionId: '1234',
        });

        // Mock prisma.booking.create to track if it's called (should not be)
        const mockCreate = prisma.booking.create as jest.Mock;

        const res = await request(app)
            .post('/payment/success')
            .send({ sessionId: '1234' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Bookings for this session already exist, skipping creation." });
        expect(mockFindFirst).toHaveBeenCalledTimes(1);
        expect(mockCreate).not.toHaveBeenCalled();
    });

    // Test 6
    test('Booking Not Exist -> Create Booking', async ()=>{
        mockRetrieve.mockResolvedValueOnce({
            payment_status: 'paid',
            metadata: metaData
        });
        const prisma = new PrismaClient() as any;
        // Booking not found
        prisma.booking.findFirst.mockResolvedValueOnce(null);
        // Create new booking
        prisma.booking.create.mockResolvedValue({ id: 'newBookingId' });
        const res = await request(app)
            .post('/payment/success')
            .send({ sessionId: '1234' });

        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual({ message: "Booking created successfully" });
        expect(prisma.booking.create).toHaveBeenCalled();
    });

    // Test 7
    test('Stripe Status 500', async ()=>{
        mockRetrieve.mockRejectedValueOnce(new Error("Stripe API Failure"));

        const res = await request(app)
            .post('/payment/success')
            .send({ sessionId: '1234' });

        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual({error: "Failed to verify payment"});
    });

})