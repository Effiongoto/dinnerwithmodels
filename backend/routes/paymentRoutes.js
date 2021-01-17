import express from 'express';
const router = express.Router();
import {
  updateUserToPaid,
  updateUserToSubscribed,
} from '../controllers/paymentController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/:id/pay').put(protect, updateUserToPaid);
router.route('/:id/subscribe').put(protect, updateUserToSubscribed);

export default router;
