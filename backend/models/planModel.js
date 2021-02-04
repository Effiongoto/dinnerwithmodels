import mongoose from "mongoose";

const planSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  interval: {
    type: String,
    required: true,
  },
  planCode: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Plan = mongoose.model("Plan", planSchema);

export default Plan;
