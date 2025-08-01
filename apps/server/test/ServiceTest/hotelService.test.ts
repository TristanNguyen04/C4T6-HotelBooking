import axios from "axios";
import { fetchHotelDetails, fetchHotelPrices , fetchHotelRoomPrices , fetchHotels} from "../../src/services/hotelService";
const baseParams = {
            destination_id: 'RsBU',
            checkin: '2025-08-10',
            checkout: '2025-08-25',
            guests: '2',
            currency: 'SGD',
            lang: 'en_US',
            landing_page: 'wl-acme-earn',
            product_type: 'earn',
            partner_id: '1089'
        };

describe('Hotel Service Test', ()=>{
    beforeAll(()=>{
        jest.retryTimes(5);
    })
    test('Fetch Hotel Details : Valid ', async ()=>{
        const res = await fetchHotelDetails('050G');
        expect(res.id).toBe('050G');
        expect(res.name).toBeDefined();

    }, 20000)
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
    }, 10000)
    test('Fetch Hotel Room Prices : Valid Params', async ()=>{
        const res = await fetchHotelRoomPrices('0vcz', baseParams);
        expect(res.completed).toBe(true);
        expect(res.completed).toBe(true);
    }, 20000);

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
    }, 20000);

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
// describe('Fetch rooms by Hotel', ()=>{
//     beforeAll(()=>{
//         jest.retryTimes(5);
//     })
//     test('Return Rooms successfully', async ()=>{
//         const result = await searchRoomsByHotel(
//             '050G', //hotel id
//             '2025-08-10', //checkin 
//             '2025-08-15', //check out
//             1, // adults
//             1, // children
//             1, // rooms
//         );
//         expect(result.completed).toBe(true);
//     },10000);

//     test('Unexpected Error', async () => {
//         const error = new Error('Error');

//         // Manually mock just axios.get for this test
//         const axiosSpy = jest.spyOn(axios, 'get').mockRejectedValueOnce(error);

//         // Optional: spy on console.error
//         const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

//         await expect(
//             searchRoomsByHotel(
//                 '050G',
//                 '2025-08-10',
//                 '2025-08-15',
//                 1,
//                 1,
//                 1
//             )
//         ).rejects.toThrow('Error');

//         expect(errorSpy).toHaveBeenCalledWith('Error searching rooms for hotel:', error);

//         // Cleanup
//         axiosSpy.mockRestore();
//         errorSpy.mockRestore();
//     });
// })