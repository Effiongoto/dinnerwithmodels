import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// @desc    Update user to paid
// @route   GET /api/payment/:id/pay
// @access  Private/Admin
const updateUserToPaid = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.modelsPaidFor =
      [...user.modelsPaidFor, req.body.username] || user.modelsPaidFor;
    //user.modelsPaidFor.push(req.body.username)
    //makelowercase here or in ModelScreen

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update user to subscribed
// @route   GET /api/payment/:id/subscribe
// @access  Private/Admin
const updateUserToSubscribed = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.isSubscribed = true;
    order.subscribedAt = Date.now();

    const updatedUser = await user.save();

    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export { updateUserToPaid, updateUserToSubscribed };
