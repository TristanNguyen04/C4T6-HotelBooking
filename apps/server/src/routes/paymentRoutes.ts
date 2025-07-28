import { Router,Request,Response } from "express";
import { createCheckoutSession, handlePaymentSuccess } from "../controllers/paymentController";

const router = Router();

router.post("/payments/checkout", createCheckoutSession);
router.post("/payments/success", handlePaymentSuccess);

export default router;
