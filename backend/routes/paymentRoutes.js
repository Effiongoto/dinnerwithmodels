const express = require('express');
const router = express.Router();
const {
  updateUserToPaid,
  updateUserToSubscribed,
  verifyTransaction,
} = require('../controllers/paymentController.js');
const {
  createPlan,
  deletePlan,
  getPlanById,
  getPlans,
  updatePlan,
} = require('../controllers/planController.js');
const {
  createSub,
  disableSub,
  enableSub,
  getSubById,
  getSubs,
} = require('../controllers/subscriptionController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');

router.route('/:id/pay').put(protect, updateUserToPaid);
router.route('/:id/subscribe').patch(protect, updateUserToSubscribed);
router.route('/plans').get(protect, getPlans).post(protect, admin, createPlan);
router
  .route('/plans/:id')
  .get(protect, admin, getPlanById)
  .patch(protect, admin, updatePlan)
  .delete(protect, admin, deletePlan);
router.route('/subscriptions').get(protect, getSubs).post(protect, createSub);
router.route('/subscriptions/:id').get(protect, getSubById);
router.route('/subscriptions/:id/enable').patch(protect, admin, enableSub);
router.route('/subscriptions/:id/disable').patch(protect, disableSub);
router.route('/verify/:ref').get(protect, verifyTransaction);

module.exports = router;
