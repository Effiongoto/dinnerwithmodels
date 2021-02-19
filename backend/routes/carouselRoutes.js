const express = require('express');
const { admin, protect } = require('../middleware/authMiddleware.js');
const {
  getCarousels,
  getCarouselById,
  createCarousel,
  updateCarousel,
  deleteCarousel,
} = require('../controllers/carouselController.js');
const router = express.Router();

router
  .route('/')
  .get(protect, admin, getCarousels)
  .post(protect, admin, createCarousel);
router
  .route('/:id')
  .get(protect, admin, getCarouselById)
  .patch(protect, admin, updateCarousel)
  .delete(protect, admin, deleteCarousel);

module.exports = router;
