import request from "supertest";
import prisma from "../../src/utils/prismaClient";
import app from "../../src/index";
import { searchDestinations } from "../../src/controllers/destinationController";
import stripe from "../../src/utils/stripeClient";
import * as fs from "fs";
import bcrypt from 'bcrypt';
import { Destination } from "../../src/models/Destination";
import path from "path";
import Fuse from "fuse.js";
import { TESTsearchDestinations } from "../../src/controllers/destinationController";

describe("GET /api/search", () => {

  // Test 1
  test("Return multiple matches - San", async () => {
    const res = await request(app).get("/api/TEST/destinations?query=san");
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
    const res = await request(app).get("/api/TEST/destinations?query=sa");
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
    const res = await request(app).get("/api/TEST/destinations?query=singapore");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([]);
  });

  // Test 4
  test("Error: No query", async () => {
    const res = await request(app).get("/api/TEST/destinations");
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Missing query parameter" });
  });

  // Test 5
  test("Return multiple results - z", async () => {
    const res = await request(app).get("/api/TEST/destinations?query=z");
    const expectedRes = [
      { term: "Phoenix", state: "Arizona" },
      { term: "Lang Zhou", state: "China" },
    ];

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expectedRes);
  });
});
