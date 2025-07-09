import { Router } from "express";
import { searchDestinations } from "../controllers/destinationController";

const router = Router();

router.get('/destinations', searchDestinations);

export default router;