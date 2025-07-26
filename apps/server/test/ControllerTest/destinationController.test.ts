import request from "supertest";
import app from "../../src/index";


const catchSymbols = {
    term: "!@#$, ', :\"",
    type: "tree",
    uid: "A!@#",
    }

describe("GET /api/search", () => {

  // Test 1
  test("Return multiple matches - San", async () => {
    const res = await request(app).get("/api/destinations?query=san");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });

  // Test 2
  test("Return multiple matches - Sa", async () => {
    const res = await request(app).get("/api/destinations?query=sa");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });

  // Test 3
  test("No matches - Singapore", async () => {
    const res = await request(app).get("/api/destinations?query=singapore");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });

  // Test 4
  test("Error: No query", async () => {
    const res = await request(app).get("/api/TEST/destinations");
    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({ error: "Missing query parameter" });
  });

  // Test 5
  test("Return multiple results - z", async () => {
    const res = await request(app).get("/api/destinations?query=z");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
  });

  test("No query given", async () => {
    const res = await request(app).get("/api/destinations?query=");
    expect(res.body).toEqual(
      {error: "Missing query parameter"}
    );
  });
  
  test("Query contains numbers", async () => {
    const res = await request(app).get("/api/destinations?query=1");
    expect(res.body).toBeDefined();
  });
  test("Query contains symbols: !", async () => {
    const res = await request(app).get("/api/destinations?query=!");
    expect(res.body).toEqual(expect.arrayContaining([
      expect.objectContaining(catchSymbols)
    ]))
  });
  test("Query contains symbols: {}", async () => {
    const res = await request(app).get("/api/destinations?query={");
    expect(res.body).toEqual([]);
    const res1 = await request(app).get("/api/destinations?query=}");
    expect(res1.body).toEqual([]);
  });
  test("Query contains symbols: <>", async () => {
    const res1 = await request(app).get("/api/destinations?query=<");
    expect(res1.body).toEqual([]);
    const res2 = await request(app).get("/api/destinations?query=>");
    expect(res2.body).toEqual([]);
  })
  test("Query contains symbols: []", async () => {
    const res1 = await request(app).get("/api/destinations?query=[");
    expect(res1.body).toEqual([]);
    const res2 = await request(app).get("/api/destinations?query=]");
    expect(res2.body).toEqual([]);
  })
  test("Query contains symbols: +=", async () => {
    const res1 = await request(app).get("/api/destinations?query=+");
    expect(res1.body).toEqual({"error": "Missing query parameter"});
    const res2 = await request(app).get("/api/destinations?query==");
    expect(res2.body).toEqual([]);
  })
  test("Query contains symbols: `~", async () => {
    const res1 = await request(app).get("/api/destinations?query=`");
    expect(res1.body).toEqual([]);
    const res2 = await request(app).get("/api/destinations?query=~");
    expect(res2.body).toEqual([]);
  });
});
