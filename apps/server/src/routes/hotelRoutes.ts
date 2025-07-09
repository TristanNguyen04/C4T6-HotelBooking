import { Router } from 'express';
import { searchHotels, getHotelDetails } from '../controllers/hotelController';

const router = Router();

router.get('/hotels/search', searchHotels);
router.get('/hotels/:id/details', getHotelDetails);

export default router;