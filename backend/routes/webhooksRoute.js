import express from "express";
import crypto from "crypto";
import User from "../models/userModel";
const router = express.Router();

router.post("/", async (req, res) => {
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest("hex");
  if (hash === req.headers["x-paystack-signature"]) {
    const event = req.body;
    const email = event.data.customer.email;
    const planCode = event.data.plan.plan_code;
    const user = await User.findOne({ email });
    if (user) {
      if (user.isSubscribed.planCode === planCode) {
        if (event.event === "charge.success") {
          user.isSubscribed = user.isSubscribed;
        } else {
          user.isSubscribed = { ...user.isSubscribed, status: "inactive" };
        }
        await user.save();
      }
    }
  }
  res.send(200);
});

export default router;
