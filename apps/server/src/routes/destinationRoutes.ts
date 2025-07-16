import { Router } from "express";
import { searchDestinations, searchLocationRadius } from "../controllers/destinationController";
import { searchHotelUsingDest } from "../controllers/hotelController";

const router = Router();

router.get('/destinations', searchDestinations);
router.get('/destinations/hotel', searchHotelUsingDest);
router.get('/destinations/nearby' , searchLocationRadius);

export default router;