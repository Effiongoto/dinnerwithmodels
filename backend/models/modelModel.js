import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
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
      required: true,
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
      required: true,
    },
    DOB: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    states_visited_often: {
      type: String,
      required: false,
    },
    open_to_dinner_dates: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    minCashGift: {
      type: Number,
      required: true,
    },
    profileImage: {
      type: String,
    },
    watermarkImage: {
      type: String
    },
    watermarkText: {
      type: String
    },
    images: {
      type: Array,
    },
    privateImages: {
      type: Array,
    },
    verificationImage: {
      type: String,
    },
    minCashGift: {
      type: String,
      required: true,
    },
    phoneNumber1: {
      type: Number,
      required: true,
      default: '',
    },
    phoneNumber2: {
      type: Number,
      required: false,
    },
    whatsappNumber: {
      type: Number,
      required: true,
    },
    attestation1: {
      type: String,
      required: false,
    },
    attestation2: {
      type: String,
      required: false,
    },
    attestation3: {
      type: String,
      required: false,
    },
    attestation4: {
      type: String,
      required: false,
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
