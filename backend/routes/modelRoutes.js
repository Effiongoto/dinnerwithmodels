import express from 'express';
const router = express.Router();
import {
  getModels,
  getAllModels,
  getModelById,
  authModel,
  registerModel,
  getModelProfile,
  updateModelProfile,
  deleteModel,
  updateModel,
  createModelReview,
} from '../controllers/modelController.js';
import { modelProtect, admin, protect } from '../middleware/authMiddleware.js';

router.route('/').get(getModels).post(registerModel);
router.route('/all').get(getAllModels);
router.post('/login', authModel);
router
  .route('/profile')
  .get(modelProtect, getModelProfile)
  .put(modelProtect, updateModelProfile);
router.route('/:id/reviews').post(protect, createModelReview);
router
  .route('/:id')
  .get(getModelById)
  .delete(protect, admin, deleteModel)
  .put(protect, admin, updateModel);

export default router;
