const express = require('express');
const crypto = require('crypto');
const User = require('../models/userModel.js');
const router = express.Router();

// use the webhooks to check subscriptions.
router.post('/', async (req, res) => {
  const hash = crypto
    .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');
  if (hash === req.headers['x-paystack-signature']) {
    const event = req.body;
    if (event.event === 'charge.success') {
      const email = event.data.customer.email;
      const planCode = event.data.plan.plan_code;
      const user = await User.findOne({ email });
      if (user) {
        if (user.isSubscribed.planCode === planCode) {
          user.isSubscribed = {
            ...user.isSubscribed,
            reference: event.data.reference,
          };

          await user.save();
        }
      }
    }

    if (event.event === 'invoice.update') {
      const email = event.data.customer.email;
      const subCode = event.data.subscription.subscription_code;
      const user = await User.findOne({ email });
      if (user) {
        if (user.isSubscribed.subCode === subCode && event.data.paid === true) {
          user.isSubscribed = {
            ...user.isSubscribed,
            status: 'active',
            nextPaymentDate: event.data.subscription.next_payment_date,
            reference: event.data.transaction.reference,
          };
        }
      }
    }

    if (event.event === 'invoice.payment_failed') {
      const email = event.data.customer.email;
      const subCode = event.data.subscription.subscription_code;
      const user = await User.findOne({ email });
      if (user.isSubscribed.subCode === subCode && event.data.paid === false) {
        user.isSubscribed = {
          ...user.isSubscribed,
          status: 'inactive',
          emailToken: event.data.subscription.email_token,
        };
      }
    }
  }
  res.send(200);
});

module.exports = router;
