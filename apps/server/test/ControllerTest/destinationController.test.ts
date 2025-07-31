import request from "supertest";
import app from "../../src/index";
import { searchLocationRadius } from "../../src/controllers/destinationController";

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
  test("Rturn multiple matches - Singapore", async () => {
    const res = await request(app).get("/api/destinations?query=singapore");
    expect(res.statusCode).toBe(200);
    expect(res.body).toBeDefined();
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

describe('Calculate Distance between two locations using Lat and Lng', ()=>{
  // Valid
  test('-90 < Lat < 90 , -180 < Lng < 180', async ()=>{
    const res = await request(app)
      .get('/api/destinations/nearby')
      .query({lat:'1.3521' , lng: '103.8198', radius: '10'})

    expect(res.body.length).toBeGreaterThan(0);
    expect(res.statusCode).toBe(200);
  });
  // Lat below -90
  test('Lat < -90 , -180 < Lng < 180', async ()=>{
    const res = await request(app)
      .get('/api/destinations/nearby')
      .query({lat:'-90.1' , lng: '103.8198', radius: '10'})

    expect(res.body).toEqual({error: "Invalid latitude or longitude values"});
    expect(res.statusCode).toBe(400);
  });

  // Lat greater than 90
  test('90 < Lat , -180 < Lng < 180', async ()=>{
    const res = await request(app)
      .get('/api/destinations/nearby')
      .query({lat:'90.1' , lng: '103.8198', radius: '10'})

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({error: "Invalid latitude or longitude values"});
  });
  // Lng lower than -180
  test('-90 < Lat , Lng < -180', async ()=>{
    const res = await request(app)
      .get('/api/destinations/nearby')
      .query({lat:'-1.3521' , lng: '-180.01', radius: '10'})

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({error: "Invalid latitude or longitude values"});
  });
  // Lng greater than 180
  test('-90 < Lat , Lng < -180', async ()=>{
    const res = await request(app)
      .get('/api/destinations/nearby')
      .query({lat:'-1.3521' , lng: '180.01', radius: '10'})

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({error: "Invalid latitude or longitude values"});
  });

  // Both values can be wrong
  test('-90 > Lat , Lng < -180', async ()=>{
    const res = await request(app)
      .get('/api/destinations/nearby')
      .query({lat:'-90.01' , lng: '-180.01', radius: '10'})

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({error: "Invalid latitude or longitude values"});
  });

  // Both values can be wrong
  test('-90 > Lat , Lng < -180', async ()=>{
    const res = await request(app)
      .get('/api/destinations/nearby')
      .query({lat:'90.01' , lng: '180.01', radius: '10'})

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({error: "Invalid latitude or longitude values"});
  });
  // Both values can be wrong
  test('-90 > Lat , Lng < -180', async ()=>{
    const res = await request(app)
      .get('/api/destinations/nearby')
      .query({lat:'-90.01' , lng: '180.01', radius: '10'})

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({error: "Invalid latitude or longitude values"});
  });
  // Both values can be wrong
  test('-90 > Lat , Lng < -180', async ()=>{
    const res = await request(app)
      .get('/api/destinations/nearby')
      .query({lat:'90.01' , lng: '-180.01', radius: '10'})

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({error: "Invalid latitude or longitude values"});
  });

  test('NaN value', async ()=>{
    const res = await request(app)
      .get('/api/destinations/nearby')
      .query({lat:'string' , lng: 'dog', radius: 'cat'})

    expect(res.statusCode).toBe(400);
    expect(res.body).toEqual({error: "Invalid params"});
  });
})