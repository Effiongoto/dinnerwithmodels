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
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/:id/pay").put(protect, updateUserToPaid);
router.route("/:id/subscribe").patch(protect, updateUserToSubscribed);
router
  .route("/plans")
  .get(protect, getPlans)
  .post(protect, admin, createPlan);
router
  .route("/plans/:id")
  .get(protect, admin, getPlanById)
  .patch(protect, admin, updatePlan)
  .delete(protect, admin, deletePlan);

export default router;
