import { Router } from 'express';
import { clearBookingTable , clearUserTable } from '../controllers/dbController';
const router = Router();

router.get('/dbutil/clear-usertable', clearUserTable);
router.get('/dbutil/clear-bookingtable', clearBookingTable);
export default router;