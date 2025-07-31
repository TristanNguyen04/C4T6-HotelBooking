import { Router } from 'express';
import { register, login, verifyEmail, resendVerificationEmail, checkVerificationStatus} from '../controllers/authController';

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/verify-email', verifyEmail);
router.post('/auth/resend-verification', resendVerificationEmail);
router.get('/auth/check-verification', checkVerificationStatus);
// router.get('/auth/get-uid', getUID);
export default router;