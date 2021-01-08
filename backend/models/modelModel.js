import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const modelSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      // required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    about: {
      type: String,
      // required: true,
    },
    DOB: {
      type: String,
      // required: true,
    },
    country: {
      type: String,
      // required: true,
    },
    state: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },
    states_visited_often: {
      type: Array,
      required: false,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    price: {
      type: Number,
      // required: true,
      default: 5000,
    },
    profileImage: {
      type: String,
      // required: true,
    },
    images: {
      type: Array,
      // required: true,
    },
    privateImages: {
      type: Array,
      // required: true,
    },
    verificationImage: {
      type: String,
    },
    minCashGift: {
      type: Number,
      // required: true,
      default: 0,
    },
    phoneNumber1: {
      type: String,
      // required: true,
      default: '0000',
    },
    phoneNumber2: {
      type: String,
      // required: false,
      default: '0000',
    },
    whatsappNumber: {
      type: String,
      // required: true,
      default: '0000',
    },
  },
  {
    timestamps: true,
  }
);

modelSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

modelSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Model = mongoose.model('Model', modelSchema);

export default Model;
