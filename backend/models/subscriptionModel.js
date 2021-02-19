const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema(
  {
    user: {
      type: Object,
      required: true,
    },
    subCode: {
      type: String,
      required: true,
    },
    planCode: {
      type: String,
    },
    reference: {
      type: String,
    },
    emailToken: {
      type: String,
      required: true,
    },
    nextPaymentDate: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;
