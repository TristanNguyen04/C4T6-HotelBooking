import { Router } from 'express';
import { createBooking, getMyBookings } from '../controllers/bookingController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/bookings', authenticate, createBooking);
router.get('/bookings/me', authenticate, getMyBookings);

export default router;