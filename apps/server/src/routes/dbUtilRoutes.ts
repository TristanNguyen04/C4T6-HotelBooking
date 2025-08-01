import { Router } from 'express';
import { clearBookingTable , clearUserTable, addVerifiedUser } from '../controllers/dbController';
const router = Router();

router.get('/dbutil/clear-usertable', clearUserTable);
router.get('/dbutil/clear-bookingtable', clearBookingTable);
router.post('/dbutil/add-verified-user',addVerifiedUser);
export default router;