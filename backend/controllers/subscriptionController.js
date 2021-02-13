import asyncHandler from "express-async-handler";
import Subscription from "../models/subscriptionModel.js";
import _ from "lodash";
import axios from "axios";

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
  try {
    axios
      .get(`https://api.paystack.co/transaction/verify/${req.body.reference}`, {
        headers: {
          Authorization: process.env.PAYSTACK_SECRET_KEY,
        },
      })
      .then((resp) => {
        if (resp.data.message === "Verification successful") {
          try {
            axios
              .post("https://api.paystack.co/subscription", req.body.sub, {
                headers: {
                  Authorization: process.env.PAYSTACK_SECRET_KEY,
                  "Content-Type": "application/json",
                },
              })
              .then(async (response) => {
                const subDetails = response.data.data;
                const {
                  subscription_code: subCode,
                  email_token: emailToken,
                  amount,
                  status,
                  createdAt,
                } = subDetails;

                const subExists = await Subscription.findOne({
                  subCode,
                }).exec();

                if (subExists) {
                  res.status(404);
                  throw new Error("Subscription already exists");
                }

                const sub = await Subscription.create({
                  user: { ..._.pick(req.body.user, ["_id", "name", "email"]) },
                  subCode,
                  planCode: req.body.sub.plan,
                  reference: req.body.reference,
                  emailToken,
                  amount,
                  status,
                  createdAt,
                });
                if (sub) {
                  res.json(sub);
                }
              });
          } catch (error) {
            res.status(404);
            throw error;
          }
        }
      });
  } catch (error) {
    res.status(404);
    throw error;
  }
  // const {
  //   user,
  //   subscription_code: subCode,
  //   email_token: emailToken,
  //   amount,
  //   status,
  //   createdAt,
  // } = req.body;

  // const subExists = await Subscription.findOne({ subCode }).exec();

  // if (subExists) {
  //   res.status(404);
  //   throw new Error("Subscription already exists");
  // }

  // const sub = await Subscription.create({
  //   user: { ..._.pick(user, ["_id", "name", "email"]) },
  //   subCode,
  //   emailToken,
  //   amount,
  //   status,
  //   createdAt,
  // },);
  // if (sub) {
  //   res.json(sub);
  // }
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
  try {
    axios
      .post("https://api.paystack.co/subscription/disable", req.body.sub, {
        headers: {
          Authorization: process.env.PAYSTACK_SECRET_KEY,
          "Content-Type": "application/json",
        },
      })
      .then(async (response) => {
        if (response.data.message === "Subscription disabled successfully") {
          const sub = await Subscription.findById(req.params.id).exec();
          if (sub) {
            sub.status = "inactive";
          }
          const updatedSub = await sub.save();
          res.json(updatedSub);
        } else {
          res.status(404);
          throw new Error("Disable Subscription Failed");
        }
      });
  } catch (error) {
    res.status(404);
    throw error;
  }
  // const sub = await Subscription.findByIdAndUpdate(
  //   req.params.id,
  //   { $set: req.body },
  //   { new: true }
  // ).exec();

  // if (sub) {
  //   res.json(sub);
  // } else {
  //   res.status(404);
  //   throw new Error("Subscription does not exist");
  // }
});

export { getSubs, getSubById, createSub, enableSub, disableSub };
