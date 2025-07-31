import { Router } from 'express';
import { register, login, verifyEmail, resendVerificationEmail, checkVerificationStatus, getProfile, updateProfile, changePassword, deleteAccount, getUID } from '../controllers/authController';
import { authenticate } from '../middleware/auth';

const router = Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/verify-email', verifyEmail);
router.post('/auth/resend-verification', resendVerificationEmail);
router.get('/auth/check-verification', checkVerificationStatus);

// Protected routes
router.get('/auth/profile', authenticate, getProfile);
router.patch('/auth/profile', authenticate, updateProfile);
router.patch('/auth/change-password', authenticate, changePassword);
router.delete('/auth/delete-account', authenticate, deleteAccount);

// router.get('/auth/get-uid', getUID);

export default router;