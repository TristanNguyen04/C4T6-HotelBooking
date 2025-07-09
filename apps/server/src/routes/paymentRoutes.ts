import { Router,Request,Response } from "express";
import { Stripe } from "stripe";
import { createCheckoutSession } from "../controllers/paymentController";

const router = Router();

router.post("/checkout", createCheckoutSession);

export default router;
