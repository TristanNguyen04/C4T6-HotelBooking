import { Router,Request,Response } from "express";
import { createCheckoutSession, handlePaymentSuccess , mockPaymentSuccess,} from "../controllers/paymentController";

const router = Router();

router.post("/payments/checkout", createCheckoutSession);
router.post("/payments/success", handlePaymentSuccess);
router.post("/payments/mock-success", mockPaymentSuccess);

export default router;
