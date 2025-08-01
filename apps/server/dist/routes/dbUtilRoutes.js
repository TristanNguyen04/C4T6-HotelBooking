"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dbController_1 = require("../controllers/dbController");
const router = (0, express_1.Router)();
router.get('/dbutil/clear-usertable', dbController_1.clearUserTable);
router.get('/dbutil/clear-bookingtable', dbController_1.clearBookingTable);
router.post('/dbutil/add-verified-user', dbController_1.addVerifiedUser);
exports.default = router;
