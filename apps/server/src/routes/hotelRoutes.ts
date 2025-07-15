import { Router } from 'express';
import { searchHotels, getHotelDetails } from '../controllers/hotelController';
import {searchLocationRadius} from '../controllers/destinationController';
import { getHotelBasicDetails } from '../controllers/hotelController';
const router = Router();

router.get('/hotels/search', searchHotels);
router.get('/hotels/:id/details', getHotelDetails);
router.get('/hotels/00Qh/details/nearby' , searchLocationRadius);
router.get('/hotels/:id/basic-details', getHotelBasicDetails);

export default router;