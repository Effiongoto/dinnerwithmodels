import express from 'express';
const router = express.Router();
import {
  getModels,
  getModelById,
  authModel,
  registerModel,
  getModelProfile,
  updateModelProfile,
} from '../controllers/modelController.js';
import { modelProtect } from '../middleware/authMiddleware.js';

router.route('/').get(getModels).post(registerModel);
router.post('/login', authModel);
router
  .route('/profile')
  .get(modelProtect, getModelProfile)
  .put(modelProtect, updateModelProfile);
router.route('/:id').get(getModelById);

export default router;
