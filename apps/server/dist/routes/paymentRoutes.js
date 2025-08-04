"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const router = (0, express_1.Router)();
router.post("/payments/checkout", paymentController_1.createCheckoutSession);
router.post("/payments/success", paymentController_1.handlePaymentSuccess);
router.post("/payments/mock-success", paymentController_1.mockPaymentSuccess);
exports.default = router;
