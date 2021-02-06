import express from "express";
const router = express.Router();
import {
  updateUserToPaid,
  updateUserToSubscribed,
} from "../controllers/paymentController.js";
import {
  createPlan,
  deletePlan,
  getPlanById,
  getPlans,
  updatePlan,
} from "../controllers/planController.js";
import {
  createSub,
  disableSub,
  enableSub,
  getSubById,
  getSubs,
} from "../controllers/subscriptionController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/:id/pay").put(protect, updateUserToPaid);
router.route("/:id/subscribe").patch(protect, updateUserToSubscribed);
router.route("/plans").get(protect, getPlans).post(protect, admin, createPlan);
router
  .route("/plans/:id")
  .get(protect, admin, getPlanById)
  .patch(protect, admin, updatePlan)
  .delete(protect, admin, deletePlan);
router.route("/subscriptions").get(protect, getSubs).post(protect, createSub);
router.route("/subscriptions/:id").get(protect, admin, getSubById);
router.route("/subscriptions/:id/enable").patch(protect, admin, enableSub);
router.route("/subscriptions/:id/disable").patch(protect, admin, disableSub);

export default router;
