import express from "express";
import { admin, protect } from "../middleware/authMiddleware.js";
import {
  getCarousels,
  getCarouselById,
  createCarousel,
  updateCarousel,
  deleteCarousel,
} from "../controllers/carouselController.js";
const router = express.Router();

router
  .route("/")
  .get(protect, getCarousels)
  .post(protect, admin, createCarousel);
router
  .route("/:id")
  .get(protect, admin, getCarouselById)
  .patch(protect, admin, updateCarousel)
  .delete(protect, admin, deleteCarousel);

export default router;
