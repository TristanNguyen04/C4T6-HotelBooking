import request from "supertest";
import app from "../../src/index";
import { setupTest, tearDown } from "../helper/setup";
import { calculateNights } from "../../src/controllers/hotelController";
import * as hotelService from "../../src/services/hotelService";

jest.mock("../../src/services/hotelService");
const fetchHotels = hotelService.fetchHotels as jest.Mock;
const fetchHotelPrices = hotelService.fetchHotelPrices as jest.Mock;
const fetchHotelDetails = hotelService.fetchHotelDetails as jest.Mock;
const fetchHotelRoomPrices = hotelService.fetchHotelRoomPrices as jest.Mock;

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
        converted_price: 200,
        lowest_converted_price: 200,
        nights:null
    },
  ],
};

const queryParams = { 
    destination_id:'123', 
    checkin:'25-06-2025', 
    checkout:'26-06-2025', 
    guests:'2',
    currency:'SGD', 
    lang:'en_US',
    partner_id: '1',
}

describe('Testing for Calculation of Nights' , ()=>{
  test('Check-in is before checkout' , ()=>{
    const res = calculateNights('2025-08-01', '2025-08-10');
    expect(res).toBe(9);
  });
  test('Check-in is the same as Check-out' , ()=>{
    const res = calculateNights('2025-08-01', '2025-08-01');
    expect(res).toBe(0);
  });
});

describe("GET /api/hotels/search", () => {
  beforeAll(async () => {
    await setupTest();
  });

  afterAll(async()=>{
    await tearDown();
  })

  // Test 1
  test("Successfully search hotels", async () => {
    (fetchHotels as jest.Mock).mockResolvedValue(mockHotels);
    (fetchHotelPrices as jest.Mock).mockResolvedValue(mockPrices); 
    const res = await request(app).get("/api/hotels/search").query(queryParams);

    expect(res.statusCode).toBe(200);
    expect(res.body.data).toEqual([
      {id:'1', name:'Hotel A', price: 200, currency: 'SGD', nights:null, totalPrice:200},
      {id:'2', name:'Hotel B', price: 300, currency: 'SGD', nights:null, totalPrice:300},
    ]);
  });

  // Test 2
  test("Missing Destination Id", async () => {
    const incompleteQuery: Partial<typeof queryParams> = { ...queryParams };
    delete incompleteQuery.destination_id;

    const res = await request(app)
      .get("/api/hotels/search")
      .query(incompleteQuery);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Missing required parameters" });
  });

  // Test 3
  test("Missing Checkin", async () => {
    const incompleteQuery: Partial<typeof queryParams> = { ...queryParams };
    delete incompleteQuery.checkin;

    const res = await request(app)
      .get("/api/hotels/search")
      .query(incompleteQuery);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Missing required parameters" });
  });

  // Test 4
  test("Missing Checkout", async () => {
    const incompleteQuery: Partial<typeof queryParams> = { ...queryParams };
    delete incompleteQuery.checkout;

    const res = await request(app)
      .get("/api/hotels/search")
      .query(incompleteQuery);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Missing required parameters" });
  });

  // Test 5
  test("Missing Guest", async () => {
    (fetchHotels as jest.Mock).mockResolvedValue(mockHotels);
    (fetchHotelPrices as jest.Mock).mockResolvedValue(mockPrices);
    const incompleteQuery: Partial<typeof queryParams> = { ...queryParams };
    delete incompleteQuery.guests;

    const res = await request(app)
      .get("/api/hotels/search")
      .query(incompleteQuery);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Missing required parameters" });
  });
});

describe("GET /api/hotels/:id/details", () => {
  let userId: string;
  let token: string;
  beforeAll(async () => {
    const user = await setupTest();
    userId = user.userId;
    token = user.token;
  });

  afterAll(async () => {
    await tearDown();
  });

  // Test 1
  test("Get Hotel Details Successfully", async () => {
    (fetchHotelDetails as jest.Mock).mockResolvedValue(mockHotelInfo);
    (fetchHotelRoomPrices as jest.Mock).mockResolvedValue(mockRoomPricing);
    const res = await request(app)
      .get("/api/hotels/050G/details")
      .query(queryParams);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      ...mockHotelInfo,
      rooms: mockRoomPricing.rooms,
    });
  });

  // Test 2
  test("Missing required Param: checkin", async () => {
    const incompleteQuery: Partial<typeof queryParams> = { ...queryParams };
    delete incompleteQuery.checkin;

    const res = await request(app)
      .get("/api/hotels/050G/details")
      .query(incompleteQuery);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Missing required paramaters" });
  });
  // Test 3
  test("Missing required Param: checkout", async () => {
    const incompleteQuery: Partial<typeof queryParams> = { ...queryParams };
    delete incompleteQuery.checkout;

    const res = await request(app)
      .get("/api/hotels/050G/details")
      .query(incompleteQuery);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Missing required paramaters" });
  });
  // Test 4
  test("Missing required Param: guests", async () => {
    const incompleteQuery: Partial<typeof queryParams> = { ...queryParams };
    delete incompleteQuery.guests;

    const res = await request(app)
      .get("/api/hotels/050G/details")
      .query(incompleteQuery);

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Missing required paramaters" });
  });

});
