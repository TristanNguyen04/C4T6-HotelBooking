import app from "../../src/index";
import request from "supertest";
import { setupTest , tearDown } from "../helper/setup";
import jwt from 'jsonwebtoken';
import prisma from "../../src/utils/prismaClient";

const bookingParam = {
  hotelId: "h123",
  hotelName: "Grand Hotel",
  roomKey: "R1",
  roomDescription: "Sea View",
  roomImage: "https://example.com/image.jpg",
  specialRequest: "Late check-in",
  primaryGuestFullName: "John Doe",
  primaryGuestPhoneNumber: "12345678",
  checkin: new Date().toISOString(),
  checkout: new Date(Date.now() + 86400000).toISOString(),
  guests: "2",
  baseRateInCurrency: 100,
  includedTaxesAndFeesInCurrency: 120,
  sessionId: "1234",
};

describe("Test Booking API: /api/bookings", () => {
  let userId: string;
  let token: string;
  beforeAll(async () => {
    const user = await setupTest();
    userId = user.userId;
    token = user.token;
  });
  
    afterAll(async()=>{
      tearDown();
    })

  // Test 1
  test("Test createBooking", async () => {
    const res = await request(app)
      .post("/api/bookings")
      .set('Authorization', `Bearer ${token}`)
      .send(bookingParam);
      
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      hotelId: bookingParam.hotelId,
      hotelName: bookingParam.hotelName,
      roomKey: bookingParam.roomKey,
      roomDescription: bookingParam.roomDescription,
      roomImage: bookingParam.roomImage,
      request: bookingParam.specialRequest,
      guestName: bookingParam.primaryGuestFullName,
      guestNumber: bookingParam.primaryGuestPhoneNumber,
      checkin: expect.any(String),
      checkout: expect.any(String),
      guests: bookingParam.guests,
      baseRateInCurrency: bookingParam.baseRateInCurrency,
      includedTaxesAndFeesInCurrency: bookingParam.includedTaxesAndFeesInCurrency,
      stripeSessionId: bookingParam.sessionId,
    });
  });

  test("createBooking handles errors gracefully", async () => {
    const createSpy = jest
      .spyOn(prisma.booking, "create")
      .mockRejectedValue(new Error("Database failure"));

    const res = await request(app)
      .post("/api/bookings")
      .set("Authorization", `Bearer ${token}`)
      .send(bookingParam);

    expect(res.body).toEqual({ error: "Failed to create booking" });
    expect(res.statusCode).toBe(500);

    createSpy.mockRestore();
  });


  test("User is unauthorized", async () => {
    const res = await request(app)
      .post("/api/bookings")
      .send(bookingParam);
  
    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ error: "Missing authorization header" });
  });

  test("Retrieve Bookings : Authenticated", async () => {
    const res = await request(app)
      .get("/api/bookings/me")
      .set('Authorization', `Bearer ${token}`);
  
    expect(res.statusCode).toBe(200);
    // expect(res.body[0]).toMatchObject({...mockBookings, userId: userId});
  });

  test("Retrieve Bookings : Not Authenticated", async () => {
    const res = await request(app)
      .get("/api/bookings/me");

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ error: "Missing authorization header" });
  });

  test("Retrieve Bookings : Not Authorized", async () => {
    const res = await request(app)
      .get("/api/bookings/me")
      .set('Authorization', `Bearer ${null}`);

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ error: "Invalid token" });
  });

  const JWT_SECRET = process.env.JWT_SECRET || '1234567890';

  test("No user id in createBooking", async () => {
    const badToken = jwt.sign({}, JWT_SECRET); // JWT with no user ID

    const res = await request(app)
      .post("/api/bookings")
      .set('Authorization', `Bearer ${badToken}`)
      .send(bookingParam);

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ error: 'Unauthorized' });
  });

  test("No user id in getMyBookings", async () => {
    const badToken = jwt.sign({}, JWT_SECRET); // JWT with no user ID

    const res = await request(app)
      .get("/api/bookings/me")
      .set('Authorization', `Bearer ${badToken}`)

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ error: 'Unauthorized' });
  });

});
