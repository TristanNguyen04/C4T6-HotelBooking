import request from "supertest";
import prisma from "../src/utils/prismaClient";
import app from "../src/index";
import { searchDestinations } from "../src/controllers/destinationController";
import stripe from "../src/utils/stripeClient";
import * as fs from "fs";
/**
 * Mocked for tests to run but not used:
 * bcrypt
 * stripeClient
 * prismaClient
 */
jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

// mock the stripe client
jest.mock("../src/utils/stripeClient", () => ({
  checkout: {
    sessions: {
      create: jest.fn(),
      retrieve: jest.fn(),
    },
  },
}));

jest.mock("../src/utils/prismaClient", () => ({
  booking: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
  user: {
    findUnique: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  readFileSync: jest.fn(() =>
    JSON.stringify([
      { term: "Los Angeles", state: "California" },
      { term: "San Francisco", state: "California" },
      { term: "New York", state: "New York" },
      { term: "Chicago", state: "Illinois" },
      { term: "Houston", state: "Texas" },
      { term: "Phoenix", state: "Arizona" },
      { term: "Philadelphia", state: "Pennsylvania" },
      { term: "San Antonio", state: "Texas" },
      { term: "San Diego", state: "California" },
      { term: "Dallas", state: "Texas" },
      { term: "samoa", state: "samoa" },
      { term: "Shang Hai", state: "Shang Hai" },
      { term: "Lang Zhou", state: "China" },
    ])
  ),
}));

describe("GET /api/search", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test 1
  test("Return multiple matches - San", async () => {
    const res = await request(app).get("/api/destinations?query=san");
    const expectedRes = [
      { term: "San Francisco", state: "California" },
      { term: "San Antonio", state: "Texas" },
      { term: "San Diego", state: "California" },
    ];
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expectedRes);
  });

  // Test 2
  test("Return multiple matches - Sa", async () => {
    const res = await request(app).get("/api/destinations?query=sa");
    const expectedRes = [
      { term: "samoa", state: "samoa" },
      { term: "San Francisco", state: "California" },
      { term: "San Antonio", state: "Texas" },
      { term: "San Diego", state: "California" },
    ];
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expectedRes);
  });

  // Test 3
  test("No matches - Singapore", async () => {
    const res = await request(app).get("/api/destinations?query=singapore");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  // Test 4
  test("Error: No query", async () => {
    const res = await request(app).get("/api/destinations");
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Missing query parameter" });
  });

  // Test 5
  test("Return multiple results - z", async () => {
    const res = await request(app).get("/api/destinations?query=z");
    const expectedRes = [
      { term: "Phoenix", state: "Arizona" },
      { term: "Lang Zhou", state: "China" },
    ];

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expectedRes);
  });
});
