const asyncHandler = require('express-async-handler');
const Plan = require('../models/planModel.js');
const axios = require('axios');

// @desc View plans
// @route GET /api/payment/plans
// @access PrivateAdmin
const getPlans = asyncHandler(async (req, res) => {
  const plans = await Plan.find().sort({ createdAt: -1 }).exec();
  res.json(plans);
});

// @desc View a specific plan
// @route GET /api/payment/plans/:id
// @access Admin
const getPlanById = asyncHandler(async (req, res) => {
  const plan = await Plan.findById(req.params.id);
  if (plan) {
    res.json(plan);
  } else {
    throw new Error('Plan not found');
  }
});

// @desc Create plans
// @route POST /api/payment/plans
// @access Admin
const createPlan = asyncHandler(async (req, res) => {
  try {
    axios
      .post(`https://api.paystack.co/plan`, req.body.plan, {
        headers: {
          Authorization: process.env.PAYSTACK_SECRET_KEY,
          'Content-Type': 'application/json',
        },
      })
      .then(async (resp) => {
        const planDetails = resp.data.data;
        const {
          name,
          amount,
          interval,
          plan_code: planCode,
          currency,
          createdAt,
        } = planDetails;
        const planExists = await Plan.findOne({ name });
        if (planExists) {
          res.status(400);
          throw new Error('Plan already exists');
        }
        const plan = await Plan.create({
          name,
          amount,
          interval,
          planCode,
          currency,
          createdAt,
        });
        if (plan) {
          console.log('planCreated', plan);
          res.status(200).json(plan);
        }
      });
  } catch (error) {
    console.log(error);
    res.status(404);
    throw error;
  }
  // const {
  //   name,
  //   amount,
  //   interval,
  //   plan_code: planCode,
  //   currency,
  //   createdAt,
  // } = req.body;
  // const planExists = await Plan.findOne({ name });
  // if (planExists) {
  //   res.status(400);
  //   throw new Error("Plan already exists");
  // }
  // const plan = await Plan.create({
  //   name,
  //   amount,
  //   interval,
  //   planCode,
  //   currency,
  //   createdAt,
  // });
  // if (plan) {
  //   res.status(200).json(plan);
  // }
});

// @desc Update plan
// @route PATCH /api/payment/plans/:id
// @access Admin
const updatePlan = asyncHandler(async (req, res) => {
  const planDetail = req.body.plan;
  try {
    axios
      .put(
        `https://api.paystack.co/plan/${planDetail.planCode}`,
        { name: planDetail.name, amount: planDetail.amount },
        {
          headers: {
            Authorization: process.env.PAYSTACK_SECRET_KEY,
            'Content-Type': 'application/json',
          },
        }
      )
      .then(async (resp) => {
        if (resp.data.status === true) {
          const plan = await Plan.findByIdAndUpdate(
            planDetail._id,
            { $set: planDetail },
            { new: true }
          ).exec();

          if (plan) {
            res.json(plan);
          } else {
            res.status(404);
            throw new Error('Plan not found');
            s;
          }
        }
      });
  } catch (error) {
    res.status(404);
    throw error;
  }
  // const plan = await Plan.findByIdAndUpdate(
  //   req.params.id,
  //   {
  //     $set: req.body,
  //   },
  //   { new: true }
  // ).exec();

  // if (plan) {
  //   res.json(plan);
  // } else {
  //   res.status(404);
  //   throw new Error("Plan not found");
  // }
});

// @desc Delete plan
// @route DELETE /api/payment/plans/:id
// @access Admin
const deletePlan = asyncHandler(async (req, res) => {
  const plan = await Plan.findByIdAndDelete(req.params.id, (err) => {
    if (!err) {
      res.status(200).json({ message: 'Plan Deleted' });
    } else {
      res.status(404);
      throw new Error('Plan delete failed');
    }
  });
  if (!plan) {
    res.status(404);
    throw new Error('Plan not found');
  }
});

module.exports = { getPlans, getPlanById, createPlan, updatePlan, deletePlan };
