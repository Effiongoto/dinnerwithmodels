const express = require('express');
const router = express.Router();
const {
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
} = require('../controllers/modelController.js');
const {
  modelProtect,
  admin,
  protect,
} = require('../middleware/authMiddleware.js');

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

module.exports = router;
