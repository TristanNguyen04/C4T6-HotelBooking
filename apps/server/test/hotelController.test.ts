import request from 'supertest';
import app from '../src/index';
import prisma from '../src/utils/prismaClient';
import { fetchHotels, fetchHotelPrices, fetchHotelDetails, fetchHotelRoomPrices } from '../src/services/hotelService';

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

jest.mock('../src/services/hotelService');

jest.mock('../src/middleware/auth', () => ({
    authenticate: (req: any, res: any, next: any) => {
        req.userId = '123';
        next();
    },
}));


const mockHotels = [
    {id: '1', name: 'Hotel A'},
    {id:'2', name: 'Hotel B'},
]

const mockPrices = {
    currency: 'SGD',
    hotels: [
        {id:'1', price: 200},
        {id:'2', price: 300},
    ],
}

const mockHotelInfo = {
    id: '1',
    name: 'Test Hotel',
    description: 'Sample Hotel',
};

const mockRoomPricing = {
  rooms: [
    {
        id: '101',
        name: 'Deluxe Room',
        price: 200,
    },
  ],
};

const queryParams = { 
    destination_id:'123', 
    checkin:'25-06-2025', 
    checkout:'26-06-2025', 
    guests:'2',
    currency:'SGD', 
    lang:'en_US'
}


describe('GET /api/hotels/search',()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    // Test 1
    test('Successfully search hotels', async ()=>{
        (fetchHotels as jest.Mock).mockResolvedValue(mockHotels);
        (fetchHotelPrices as jest.Mock).mockResolvedValue(mockPrices);

        const res = await request(app)
            .get('/api/hotels/search')
            .query(queryParams);
        
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual([
            {id:'1', name:'Hotel A', price: 200, currency: 'SGD'},
            {id:'2', name:'Hotel B', price: 300, currency: 'SGD'},
        ]);
    });
    // Test 2
    test('Missing Destination Id', async ()=>{
        (fetchHotels as jest.Mock).mockResolvedValue(mockHotels);
        (fetchHotelPrices as jest.Mock).mockResolvedValue(mockPrices);
        
        const incompleteQuery: Partial<typeof queryParams> = { ...queryParams };
        delete incompleteQuery.destination_id;

        const res = await request(app)
            .get('/api/hotels/search')
            .query(incompleteQuery);
        
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'Missing required parameters' });
    });
    // Test 3
    test('Missing Checkin', async ()=>{
        (fetchHotels as jest.Mock).mockResolvedValue(mockHotels);
        (fetchHotelPrices as jest.Mock).mockResolvedValue(mockPrices);

        const incompleteQuery: Partial<typeof queryParams> = { ...queryParams };
        delete incompleteQuery.checkin;

        const res = await request(app)
            .get('/api/hotels/search')
            .query(incompleteQuery);
        
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'Missing required parameters' });
    });
    // Test 4
    test('Missing Checkout', async ()=>{
        (fetchHotels as jest.Mock).mockResolvedValue(mockHotels);
        (fetchHotelPrices as jest.Mock).mockResolvedValue(mockPrices);

        const incompleteQuery: Partial<typeof queryParams> = { ...queryParams };
        delete incompleteQuery.checkout;

        const res = await request(app)
            .get('/api/hotels/search')
            .query(incompleteQuery);
        
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'Missing required parameters' });
    });
    // Test 5
    test('Missing Guest', async ()=>{
        (fetchHotels as jest.Mock).mockResolvedValue(mockHotels);
        (fetchHotelPrices as jest.Mock).mockResolvedValue(mockPrices);

        const incompleteQuery: Partial<typeof queryParams> = { ...queryParams };
        delete incompleteQuery.guests;

        const res = await request(app)
            .get('/api/hotels/search')
            .query(incompleteQuery);
        
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'Missing required parameters' });
    });
});


describe('GET /api/hotels/:id/details',()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });

    // Test 1
    test('Get Hotel Details Successfully', async()=>{
        (fetchHotelDetails as jest.Mock).mockResolvedValue(mockHotelInfo);
        (fetchHotelRoomPrices as jest.Mock).mockResolvedValue(mockRoomPricing);

        const res = await request(app)
            .get('/api/hotels/1/details')
            .query(queryParams);

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({
            ...mockHotelInfo,
            rooms: mockRoomPricing.rooms,
        });
    });
    // Test 2
    test('Missing required Param: checkin', async()=>{
        (fetchHotelDetails as jest.Mock).mockResolvedValue(mockHotelInfo);
        (fetchHotelRoomPrices as jest.Mock).mockResolvedValue(mockRoomPricing);

        const incompleteQuery: Partial<typeof queryParams> = {...queryParams};
        delete incompleteQuery.checkin;

        const res = await request(app)
            .get('/api/hotels/1/details')
            .query(incompleteQuery);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'Missing required paramaters' });

    });
    // Test 3
    test('Missing required Param: checkout', async()=>{
        (fetchHotelDetails as jest.Mock).mockResolvedValue(mockHotelInfo);
        (fetchHotelRoomPrices as jest.Mock).mockResolvedValue(mockRoomPricing);

        const incompleteQuery: Partial<typeof queryParams> = {...queryParams};
        delete incompleteQuery.checkout;

        const res = await request(app)
            .get('/api/hotels/1/details')
            .query(incompleteQuery);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'Missing required paramaters' });

    });
    // Test 4
    test('Missing required Param: guests', async()=>{
        (fetchHotelDetails as jest.Mock).mockResolvedValue(mockHotelInfo);
        (fetchHotelRoomPrices as jest.Mock).mockResolvedValue(mockRoomPricing);

        const incompleteQuery: Partial<typeof queryParams> = {...queryParams};
        delete incompleteQuery.guests;

        const res = await request(app)
            .get('/api/hotels/1/details')
            .query(incompleteQuery);

        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ error: 'Missing required paramaters' });

    });
    
    // Test 1
    test('Axios Error', async()=>{
        const error = {
            response: { status: 422 },
            isAxiosError: true,
        };
        (fetchHotelDetails as jest.Mock).mockResolvedValue(mockHotelInfo);
        (fetchHotelRoomPrices as jest.Mock).mockRejectedValue(error);

        const res = await request(app)
        .get('/api/hotels/1/details')
        .query(queryParams);

        expect(res.statusCode).toBe(422);
        expect(res.body).toEqual({error:'This hotel does not support price lookup for the given dates or guest configuration.'});
    });
});
