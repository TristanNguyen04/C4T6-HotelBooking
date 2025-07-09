import { Router,Request,Response } from "express";
import { createCheckoutSession, handlePaymentSuccess } from "../controllers/paymentController";

const router = Router();

router.post("/checkout", createCheckoutSession);
router.post("/success", handlePaymentSuccess);

export default router;
