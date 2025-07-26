import request from "supertest";
import app from "../../src/index";
import { setupTest, tearDown } from "../helper/setup";
jest.setTimeout(20000);
const queryParams = {
  destination_id: "RsBU",
  checkin: "2025-08-01",
  checkout: "2025-08-05",
  guests: "2",
};

describe("GET /api/hotels/search", () => {
  beforeAll(async () => {
    await setupTest();
  });

  afterAll(async()=>{
    await tearDown();
  })

  // Test 1
  test("Successfully search hotels", async () => {
    const res = await request(app).get("/api/hotels/search").query(queryParams);

    expect(res.statusCode).toBe(200);
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
    const res = await request(app)
      .get("/api/hotels/050G/details")
      .query(queryParams);

    expect(res.statusCode).toBe(200);
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
