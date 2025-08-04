"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookingController_1 = require("../controllers/bookingController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.post('/bookings', auth_1.authenticate, bookingController_1.createBooking);
router.get('/bookings/me', auth_1.authenticate, bookingController_1.getMyBookings);
exports.default = router;
