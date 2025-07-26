import { Router } from "express";
import { searchDestinations, searchLocationRadius, TESTsearchDestinations } from "../controllers/destinationController";
import { searchHotelUsingDest } from "../controllers/hotelController";

const router = Router();

router.get('/destinations', searchDestinations);
router.get('/destinations/hotel', searchHotelUsingDest);
router.get('/destinations/nearby' , searchLocationRadius);
router.get('/TEST/destinations', TESTsearchDestinations);

export default router;