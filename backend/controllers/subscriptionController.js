import asyncHandler from "express-async-handler";
import Subscription from "../models/subscriptionModel.js";
import _ from "lodash";

// @desc View subscriptions
// @route GET /api/payment/subscriptions
// @access Admin
const getSubs = asyncHandler(async (req, res) => {
  const subs = await Subscription.find().sort({ createdAt: -1 }).exec();
  res.json(subs);
});

// @desc View a specific subscription
// @route GET /api/payments/subscriptions/:id
// @access Admin
const getSubById = asyncHandler(async (req, res) => {
  const sub = await Subscription.findOne({ subCode: req.params.id }).exec();
  
  if (sub) {
    res.json(sub);
  } else {
    throw new Error("Subscription not found");
  }
});

// @desc Create subscriptions
// @route POST /api/payment/subscriptions
// @access Admin
const createSub = asyncHandler(async (req, res) => {
  const {
    user,
    subscription_code: subCode,
    email_token: emailToken,
    amount,
    status,
    createdAt,
  } = req.body;

  const subExists = await Subscription.findOne({ subCode }).exec();

  if (subExists) {
    res.status(404);
    throw new Error("Subscription already exists");
  }

  const sub = await Subscription.create({
    user: { ..._.pick(user, ["_id", "name", "email"]) },
    subCode,
    emailToken,
    amount,
    status,
    createdAt,
  },);
  if (sub) {
    res.json(sub);
  }
});

// @desc Enable Subscription
// @route PATCH /api/payment/subscriptions/:id/enable
// @access Admin
const enableSub = asyncHandler(async (req, res) => {
  const sub = await Subscription.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  ).exec();

  if (sub) {
    res.json(sub);
  } else {
    res.status(404);
    throw new Error("Subscription does not exist");
  }
});

// @desc Enable Subscription
// @route PATCH /api/payment/subscriptions/:id/disable
// @access Admin
const disableSub = asyncHandler(async (req, res) => {
  const sub = await Subscription.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  ).exec();

  if (sub) {
    res.json(sub);
  } else {
    res.status(404);
    throw new Error("Subscription does not exist");
  }
});

export { getSubs, getSubById, createSub, enableSub, disableSub };
