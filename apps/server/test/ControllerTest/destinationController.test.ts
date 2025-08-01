import request from "supertest";
import app from "../../src/index";
import { searchLocationRadius } from "../../src/controllers/destinationController";
import { fetchHotels } from "../../src/services/hotelService";
import * as calculateDistance from '../../src/utils/calculateDistance';
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
});

jest.mock("../../src/services/hotelService", () => ({
  fetchHotels: jest.fn(),
}));

const baseParams = {
  destination_id: 'RsBU',
  checkin: '2025-07-20', // dummy values
  checkout: '2025-07-22',
  guests: '1',
  currency: 'SGD',
  lang: 'en_US',
  landing_page: 'wl-acme-earn',
  product_type: 'earn',
  partner_id: '1089'
};

const mockHotels = [
    {id: '1', name: 'Hotel A'},
    {id:'2', name: 'Hotel B'},
]


describe('Search Hotels using Destination', ()=>{
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Successfully Search for Hotels with correct params', async()=>{
    (fetchHotels as jest.Mock).mockResolvedValue(mockHotels)
    const hotels = await request(app).get('/api/destinations/hotel').query(baseParams);
    expect(hotels.body).toEqual(mockHotels);
  });

  test('Unexpected Error', async()=>{
    (fetchHotels as jest.Mock).mockRejectedValueOnce(Error('Error'));
    const hotels = await request(app).get('/api/destinations/hotel').query(baseParams);
    expect(hotels.body.error).toEqual('Error fetching hotels');
    expect(hotels.statusCode).toBe(500);
  });
  
  test('Missing Parameter : destination_id', async()=>{
    const {destination_id , ...incompleteParam} = baseParams
    const hotels = await request(app).get('/api/destinations/hotel').query(incompleteParam);
    expect(hotels.statusCode).toBe(400);
    expect(hotels.body.error).toEqual('Missing destination_id parameter');
  });
  test('Missing Parameter : checkin', async()=>{
    const {checkin , ...incompleteParam} = baseParams
    const hotels = await request(app).get('/api/destinations/hotel').query(incompleteParam);
    expect(hotels.statusCode).toBe(400);
    expect(hotels.body.error).toEqual('Missing destination_id parameter');
  });
  test('Missing Parameter : checkout', async()=>{
    const {checkout , ...incompleteParam} = baseParams
    const hotels = await request(app).get('/api/destinations/hotel').query(incompleteParam);
    expect(hotels.statusCode).toBe(400);
    expect(hotels.body.error).toEqual('Missing destination_id parameter');
  });
  test('Missing Parameter : guests', async()=>{
    const {guests , ...incompleteParam} = baseParams
    const hotels = await request(app).get('/api/destinations/hotel').query(incompleteParam);
    expect(hotels.statusCode).toBe(400);
    expect(hotels.body.error).toEqual('Missing destination_id parameter');
  });

  test("should return 500 if calculateDistance throws an error", async () => {
    jest.spyOn(calculateDistance, 'calculateDistance').mockImplementation(() => {
      throw new Error("Something went wrong");
    });

    const res = await request(app).get('/api/destinations/nearby')
      .query({ lat: '1.3521', lng: '103.8198', radius: '10' });

      expect(res.body).toEqual({ error: "Internal Server Error" });
      expect(res.status).toBe(500);

    jest.restoreAllMocks();
  });

})