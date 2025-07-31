import request from "supertest";
import app from "../src/index"; // adjust path as needed

describe("GET /", () => {
  test("should return Hello message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello, Express with TypeScript!");
  });
});
