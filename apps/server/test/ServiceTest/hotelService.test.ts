import { fetchHotelDetails, fetchHotelPrices , fetchHotelRoomPrices , fetchHotels } from "../../src/services/hotelService";
jest.setTimeout(20000);
const baseParams = {
            destination_id: 'RsBU',
            checkin: '2025-08-10',
            checkout: '2025-08-29',
            guests: '2',
            currency: 'SGD',
            lang: 'en_US',
            partner_id: '1',
        };
describe('Hotel Service Test', ()=>{
    test('Fetch Hotel Details : Valid ', async ()=>{
        const res = await fetchHotelDetails('050G');
        expect(res.id).toBe('050G');
        expect(res.name).toBeDefined();

    })
    test('Fetch Hotel Details : Invalid Params', async () => {
    try {
        await fetchHotelDetails('////');
        fail('Expected error was not thrown');
    } catch (err: any) {
        expect(err.response.status).toBe(400);
        expect(err.response.data).toEqual({
            errors: [
                {
                    code: "TE1001",
                    message: "destination_id or region_id must be present"
                }   
                ]
            });
        }
    });

    test('Fetch Hotel Prices : Valid Params', async ()=>{
        const res = await fetchHotelPrices(baseParams);
        expect(res.completed).toBe(true);
        expect(res).toBeDefined();
    });

    test('Fetch Hotel Prices : Invalid Params', async ()=>{
        try {
            const {destination_id , ...invalid} = baseParams;
            await fetchHotelPrices(invalid);
            fail('Expected error was not thrown');
        } 
        catch (err: any) {
            expect(err.response.status).toBe(422);
            expect(err.response.data).toEqual({
                completed: true,
                hotels: [],
                });
        }
    })
    test('Fetch Hotel Room Prices : Valid Params', async ()=>{
        const res = await fetchHotelRoomPrices('0vcz', baseParams);
        if(res.completed == false){
            const res = await fetchHotelRoomPrices('0vcz', baseParams);
        }
        expect(res.completed).toBe(true);
    });

    test('Fetch Hotel Room Prices : Invalid Params', async ()=>{
        try {
            await fetchHotelRoomPrices('////', baseParams);
            fail('Expected error was not thrown');
        } 
        catch (err: any) {
            expect(err.response.status).toBe(400);
            expect(err.response.data).toEqual({
                error: "Invalid params"
            });
        }
    });

    test('Fetch Hotels : Valid Params', async ()=>{
        const res = await fetchHotels(baseParams);
        expect(res.length).toBeGreaterThan(0);
    });

    test('Fetch Hotels : Invalid Params', async ()=>{
        try {
            const {destination_id , ...invalid} = baseParams;
            await fetchHotels(invalid);
            fail('Expected error was not thrown');
        } 
        catch (err: any) {
            expect(err.response.status).toBe(400);
        expect(err.response.data).toEqual({
            errors: [
                {
                    code: "TE1001",
                    message: "destination_id or region_id must be present"
                }   
                ]
            });
        }
    })
})