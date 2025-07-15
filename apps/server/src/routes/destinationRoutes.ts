import { Router } from "express";
import { searchDestinations } from "../controllers/destinationController";
import { getHotelBasicDetails } from "../controllers/hotelController";

const router = Router();

router.get('/destinations', searchDestinations);
router.get('/destinations/hotel', getHotelBasicDetails);

export default router;