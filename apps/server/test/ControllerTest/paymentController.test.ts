// apps/server/test/paymentController.test.ts

import request from "supertest";
import app from "../../src/index";
import stripe from "../../src/utils/stripeClient";
import { after, mock } from "node:test";
import prisma from "../../src/utils/prismaClient";
import { setupTest, tearDown } from "../helper/setup";

// mock the stripe client
jest.mock("../../src/utils/stripeClient", () => ({
  checkout: {
    sessions: {
      create: jest.fn(),
      retrieve: jest.fn(),
    },
  },
}));

const item = {
  hotelId: "h123",
  hotelName: "Grand Hotel",
  roomKey: "R1",
  roomDescription: "Sea View",
  roomImage: "https://example.com/image.jpg",
  request: "Late check-in",
  guestName: "John Doe",
  guestNumber: "12345678",
  checkin: new Date().toISOString(),
  checkout: new Date(Date.now() + 86400000).toISOString(),
  guests: "2",
  baseRateInCurrency: 100,
  includedTaxesAndFeesInCurrency: 120
};

const metaData = {
  userId: 'userId',
  bookings: JSON.stringify([
    {
      hotelId: item.hotelId,
      hotelName: item.hotelName,
      roomKey: item.roomKey,
      roomDescription: item.roomDescription,
      roomImage: item.roomImage,
      request: item.request,
      guestName: item.guestName,
      guestNumber: item.guestNumber,
      checkin: "2025-08-05T00:00:00.000Z",
      checkout: "2025-08-11T00:00:00.000Z",
      guests: item.guests,
      baseRateInCurrency: item.baseRateInCurrency,
      includedTaxesAndFeesInCurrency: item.includedTaxesAndFeesInCurrency,
    },
  ]),
};

const bookingData = [
    {
      hotelId: item.hotelId,
      hotelName: item.hotelName,
      roomKey: item.roomKey,
      roomDescription: item.roomDescription,
      roomImage: item.roomImage,
      specialRequest: item.request, // key should match controller code
      guestName: item.guestName,
      guestNumber: item.guestNumber,
      checkin: new Date(item.checkin).toISOString(),
      checkout: new Date(item.checkout).toISOString(),
      guests: item.guests,
      baseRateInCurrency: item.baseRateInCurrency,
      includedTaxesAndFeesInCurrency: item.includedTaxesAndFeesInCurrency,
    },
  ];

describe("POST /payment/checkout", () => {
  beforeEach(()=>{
    jest.clearAllMocks()
  })
  let userId: string;
  let token: string;
  beforeAll(async () => {
    const user = await setupTest();
    userId = user.userId;
    token = user.token;
  });
  afterAll(async ()=>{
    await tearDown();
  })

  const mockURL = "https://mockstripe.com/session";
  const mockStripe = stripe.checkout.sessions.create as jest.Mock;
  // Test 1:
  test("Receive Post Request | Create Stripe Checkout Session", async () => {
    mockStripe.mockResolvedValueOnce({ url: mockURL });
    const res = await request(app)
      // make post request to createCheckOutSession
      .post("/api/payments/checkout")
      .send({
        userId: userId,
        items: [item],
      });

      expect(res.body).toEqual({ url: mockURL });
      expect(mockStripe).toHaveBeenCalledTimes(1);
      expect(res.statusCode).toBe(200);
  });

  // Test 2:
  test("No UserID", async () => {
    const res = await request(app)
      .post("/api/payments/checkout")
      .send({
        items: [item],
      });

    expect(res.statusCode).toBe(400);
    expect(mockStripe).toHaveBeenCalledTimes(0);
  });

  // Test 3:
  test("No item", async () => {
    const res = await request(app).post("/api/payments/checkout").send({
      userId: userId,
      items: [],
    });

    expect(res.statusCode).toBe(400);
    expect(mockStripe).toHaveBeenCalledTimes(0);
  });

  // Test 4:
  test("API Error -> Error 500", async () => {
    mockStripe.mockRejectedValueOnce(new Error("Stripe API Error"));

    const res = await request(app)
      .post("/api/payments/checkout")
      .send({
        userId: userId,
        items: [item],
      });

    expect(res.statusCode).toBe(500);
    expect(mockStripe).toHaveBeenCalledTimes(1);
  });
});

describe("POST /api/payments/success", () => {
  beforeEach(()=>{
    jest.clearAllMocks()
  })
  let userId: string;
  let token: string;
  beforeAll(async () => {
    const user = await setupTest();
    userId = user.userId;
    token = user.token;
  });
  afterAll(async ()=>{
    await tearDown();
  })

  const mockURL = "https://mockstripe.com/session";
  const mockRetrieve = stripe.checkout.sessions.retrieve as jest.Mock;

  // Test 1
  test("Payment Success", async () => {
  const metaDataMock = {
    userId: userId,
    bookings: JSON.stringify(bookingData),
  };

  mockRetrieve.mockResolvedValueOnce({
    payment_status: "paid",
    metadata: metaDataMock,
  });
  const res = await request(app)
    .post("/api/payments/success")
    .send({ sessionId: "1234" });

  expect(res.body.message).toBe("Booking created successfully");
  expect(res.statusCode).toBe(201);
  expect(res.body.bookings.length).toBeGreaterThan(0);
});

  // Test 2
  test("Payment Unsuccessful", async () => {
    mockRetrieve.mockResolvedValueOnce({
      payment_status: "not_paid",
      metadata: metaData,
    });
    const res = await request(app)
      .post("/api/payments/success")
      .send({ sessionId: "1234" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Payment not completed" });
  });

  // Test 3
  test("No MetaData", async () => {
    mockRetrieve.mockResolvedValueOnce({
      payment_status: "paid",
      metadata: {},
    });
    const res = await request(app)
      .post("/api/payments/success")
      .send({ sessionId: "1234" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: "Missing booking information in session metadata",
    });
  });

  // Test 4
  test("No UserId", async () => {
    const { userId, ...modifiedMetaData } = metaData;
    mockRetrieve.mockResolvedValueOnce({
      payment_status: "paid",
      metadata: modifiedMetaData,
    });
    const res = await request(app)
      .post("/api/payments/success")
      .send({ sessionId: "1234" });
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({
      error: "Missing booking information in session metadata",
    });
  });

  // Test 5
  test("Booking Exist", async () => {
  const metaDataMock = {
    userId: userId,
    bookings: JSON.stringify(bookingData),
  };

    mockRetrieve.mockResolvedValueOnce({
      payment_status: "paid",
      metadata: metaDataMock,
    });

    const res = await request(app)
      .post("/api/payments/success")
      .send({ sessionId: "1234" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: "Bookings for this session already exist, skipping creation.",
    });
  });

  // Test 7
  test("Stripe Status 500", async () => {
    mockRetrieve.mockRejectedValueOnce(new Error("Stripe API Failure"));

    const res = await request(app)
      .post("/api/payments/success")
      .send({ sessionId: "1234" });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ error: "Failed to verify payment" });
  });
});

describe("POST /test/api/payments/mock-success", () => {
  let userId: string;
  let token: string;
  let sessionId = "mock-session-123";

  const booking = {
    hotelId: "hotel123",
    hotelName: "Hotel Test",
    roomKey: "RK123",
    roomDescription: "Test Room Description",
    roomImage: "https://example.com/image.jpg",
    request: "High floor",
    guestName: "Test User",
    guestNumber: "9998887777",
    checkin: "2025-08-05T00:00:00.000Z",
    checkout: "2025-08-10T00:00:00.000Z",
    guests: "2",
    baseRateInCurrency: "100.00",
    includedTaxesAndFeesInCurrency: "120.00",
  };

  beforeAll(async () => {
    const user = await setupTest();
    userId = user.userId;
    token = user.token;
    process.env.NODE_ENV = "test"; // Ensure mock route is enabled
  });

  afterAll(async () => {
    await tearDown();
  });

  // Test 1: Successful booking creation
  test("Creates bookings successfully", async () => {
    const res = await request(app)
      .post("/api/payments/mock-success")
      .send({
        sessionId,
        userId,
        bookings: [booking],
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("Mock booking created");
    expect(res.body.bookings.length).toBe(1);
  });

  // Test 2: Booking already exists
  test("Skips creation if booking already exists", async () => {
    const res = await request(app)
      .post("/api/payments/mock-success")
      .send({
        sessionId,
        userId,
        bookings: [booking],
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Booking already exists");
  });

  // Test 3: Missing parameters
  test("Returns 400 for missing params", async () => {
    const res = await request(app)
      .post("/api/payments/mock-success")
      .send({ sessionId });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Missing required parameters" });
  });

  // Test 4: Non-test environment
  test("Rejects call in non-test environment", async () => {
    process.env.NODE_ENV = "production"; // simulate prod
    const res = await request(app)
      .post("/api/payments/mock-success")
      .send({
        sessionId: "prod-session",
        userId,
        bookings: [booking],
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Only used in test environment" });

    process.env.NODE_ENV = "test"; // restore test
  });
});
