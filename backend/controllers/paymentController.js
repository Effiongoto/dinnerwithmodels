import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import axios from "axios";

// @desc    Update user to paid
// @route   GET /api/payment/:id/pay
// @access  Private/Admin
const updateUserToPaid = asyncHandler(async (req, res) => {
  try {
    axios
      .get(`https://api.paystack.co/transaction/verify/${req.body.reference}`, {
        headers: {
          Authorization: process.env.PAYSTACK_SECRET_KEY,
        },
      })
      .then(async (response) => {
        if (response.data.message === "Verification successful") {
          const user = await User.findById(req.params.id);
          if (user) {
            user.modelsPaidFor =
              [...user.modelsPaidFor, req.body.model] || user.modelsPaidFor;
            //user.modelsPaidFor.push(req.body.username)
            //makelowercase here or in ModelScreen

            const updatedUser = await user.save();

            res.json({
              _id: updatedUser._id,
              name: updatedUser.name,
              email: updatedUser.email,
              isAdmin: updatedUser.isAdmin,
              isSubscribed: updatedUser.isSubscribed,
              modelsPaidFor: updatedUser.modelsPaidFor,
              token: generateToken(updatedUser._id),
            });
          } else {
            res.status(404);
            throw new Error("User not found");
          }
        }
      });
  } catch (error) {
    res.status(404);
    throw error;
  }
  // const user = await User.findById(req.params.id);

  // if (user) {
  //   user.modelsPaidFor =
  //     [...user.modelsPaidFor, req.body.model] || user.modelsPaidFor;
  //   //user.modelsPaidFor.push(req.body.username)
  //   //makelowercase here or in ModelScreen

  //   const updatedUser = await user.save();

  //   res.json({
  //     _id: updatedUser._id,
  //     name: updatedUser.name,
  //     email: updatedUser.email,
  //     isAdmin: updatedUser.isAdmin,
  //     isSubscribed: updatedUser.isSubscribed,
  //     modelsPaidFor: updatedUser.modelsPaidFor,
  //     token: generateToken(updatedUser._id),
  //   });
  // } else {
  //   res.status(404);
  //   throw new Error("User not found");
  // }
});

// @desc    Update user to subscribed
// @route   PATCH /api/payment/:id/subscribe
// @access  Private/Admin
const updateUserToSubscribed = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  ).exec();

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSubscribed: user.isSubscribed,
      modelsPaidFor: user.modelsPaidFor,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }

  // if (user) {
  //   user.isSubscribed = true;
  //   order.subscribedAt = Date.now();

  //   const updatedUser = await user.save();

  //   res.json({
  //     _id: updatedUser._id,
  //     name: updatedUser.name,
  //     email: updatedUser.email,
  //     isAdmin: updatedUser.isAdmin,
  //     isSubscribed: updatedUser.isSubscribed,
  //     modelsPaidFor: updatedUser.modelsPaidFor,
  //     token: generateToken(updatedUser._id),
  //   });
  // } else {
  //   res.status(404);
  //   throw new Error('User not found');
  // }
});

// @desc    Verify a transaction
// @route   GET /api/payment/verify/:ref
// @access  Private/Admin
const verifyTransaction = asyncHandler(async (req, res) => {
  console.log("params", req.params);
  try {
    axios
      .get(`https://api.paystack.co/transaction/verify/${req.params.ref}`, {
        headers: {
          Authorization: process.env.PAYSTACK_SECRET_KEY,
        },
      })
      .then((resp) => {
        console.log(resp.data.data);
        if (resp.data.message === "Verification successful") {
          const details = resp.data.data;
          res.json(details);
        }
      });
  } catch (error) {
    res.status(400);
    throw error;
  }
});

export { updateUserToPaid, updateUserToSubscribed, verifyTransaction };
