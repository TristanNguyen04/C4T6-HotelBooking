import app from "../../src/index";
import request from "supertest";
import { setupTest , tearDown } from "../helper/setup";

const bookingParam = {
  hotelId: "Test123",
  hotelName: "Test Hotel",
  checkin: new Date('2025-08-01').toISOString(),
  checkout: new Date('2025-08-05').toISOString(),
  guests: "3",
  price: 1234,
  currency: "SGD",
  sessionId: "session123",
};
const mockBookings = {
    hotelId: "Test123",
    hotelName: "Test Hotel",
    checkin: new Date('2025-08-01').toISOString(),
    checkout: new Date('2025-08-05').toISOString(),
    guests: "3",
    price: 1234,
    currency: "SGD",
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
      .send({ ...bookingParam, userId:userId });

      const { sessionId, ...booking } = bookingParam;
      expect(res.body).toMatchObject({ ...booking, userId: userId, stripeSessionId:sessionId});
      expect(res.statusCode).toBe(200);
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
    expect(res.body[0]).toMatchObject({...mockBookings, userId: userId});
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

});
