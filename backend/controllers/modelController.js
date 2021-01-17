import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Model from '../models/modelModel.js';

// @desc    Fetch models by page
// @route   GET /api/models
// @access  Public
const getModels = asyncHandler(async (req, res) => {
  const pageSize = 15;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        username: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  const gender = req.query.gender
    ? {
        gender: req.query.gender,
      }
    : {};
  const verified = req.query.verified
    ? {
        isVerified: true,
      }
    : {};
  const count = await Model.countDocuments({
    ...keyword,
    ...gender,
    ...verified,
  });
  const models = await Model.find({ ...keyword, ...gender, ...verified })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ models, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch all models
// @route   GET /api/models/all
// @access  Public
const getAllModels = asyncHandler(async (req, res) => {
  const models = await Model.find({});
  res.json(models);
});

// @desc    Fetch single model
// @route   GET /api/models/:id
// @access  Public
const getModelById = asyncHandler(async (req, res) => {
  const model = await Model.findById(req.params.id).select('-password');

  if (model) {
    res.json(model);
  } else {
    res.status(404);
    throw new Error('Model not found');
  }
});

// @desc    Auth model & get token
// @route   POST /api/models/login
// @access  Public
const authModel = asyncHandler(async (req, res) => {
  const { input, password } = req.body; //number or pasword

  const model = await Model.findOne({ input });

  if (model && (await model.matchPassword(password))) {
    res.json({
      _id: model._id,
      username: model.username,
      email: model.email,
      isVerified: model.isVerified,
      token: generateToken(model._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid input or password');
  }
});

// @desc    Register a new model
// @route   POST /api/models
// @access  Public
const registerModel = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    password,
    gender,
    country,
    state,
    city,
    states_visited_often,
    open_to_dinner_dates,
    DOB,
    about,
    minCashGift,
    phoneNumber1,
    phoneNumber2,
    whatsappNumber,
    attestation1,
    attestation2,
    attestation3,
    attestation4,
  } = req.body;

  const modelExists = await Model.findOne({ email });
  const usernameExists = await Model.findOne({ username });

  if (modelExists) {
    res.status(400);
    throw new Error('Model already exists');
  }
  if (usernameExists) {
    res.status(400);
    throw new Error('Username already taken');
  }

  const model = await Model.create({
    username,
    email,
    password,
    gender,
    country,
    state,
    city,
    states_visited_often,
    open_to_dinner_dates,
    DOB,
    about,
    minCashGift,
    phoneNumber1,
    phoneNumber2,
    whatsappNumber,
    attestation1,
    attestation2,
    attestation3,
    attestation4,
  });

  if (model) {
    res.status(201).json({
      _id: model._id,
      username: model.username,
      email: model.email,
      isVerified: model.isVerified,
      token: generateToken(model._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid model data');
  }
});

// @desc    Get model profile
// @route   GET /api/models/profile
// @access  Private
const getModelProfile = asyncHandler(async (req, res) => {
  const model = await Model.findById(req.model._id);

  if (model) {
    res.json(model);
  } else {
    res.status(404);
    throw new Error('Model not found');
  }
});

// @desc    Update model profile
// @route   PUT /api/models/profile
// @access  Private
const updateModelProfile = asyncHandler(async (req, res) => {
  const model = await Model.findById(req.model._id);

  if (model) {
    model.username = req.body.username || model.username;
    model.email = req.body.email || model.email;
    model.gender = req.body.gender || model.gender;
    model.country = req.body.country || model.country;
    model.state = req.body.state || model.state;
    model.city = req.body.city || model.city;
    model.states_visited_often =
      req.body.states_visited_often || model.states_visited_often;
    model.open_to_dinner_dates =
      req.body.open_to_dinner_dates || model.open_to_dinner_dates;
    model.DOB = req.body.DOB || model.DOB;
    model.about = req.body.about || model.about;
    model.minCashGift = req.body.minCashGift || model.minCashGift;
    model.phoneNumber1 = req.body.phoneNumber1 || model.phoneNumber1;
    model.phoneNumber2 = req.body.phoneNumber2 || model.phoneNumber2;
    model.whatsappNumber = req.body.whatsappNumber || model.whatsappNumber;
    model.attestation1 = req.body.attestation1 || model.attestation1;
    model.attestation2 = req.body.attestation2 || model.attestation2;
    model.attestation3 = req.body.attestation3 || model.attestation3;
    model.attestation4 = req.body.attestation4 || model.attestation4;
    model.images = req.body.images || model.images;
    model.privateImages = req.body.privateImages || model.privateImages;
    model.profileImage = req.body.profileImage || model.profileImage;
    model.verificationImage =
      req.body.verificationImage || model.verificationImage;
    if (req.body.password) {
      model.password = req.body.password;
    }

    const updatedModel = await model.save();

    res.json({
      _id: updatedModel._id,
      username: updatedModel.username,
      email: updatedModel.email,
      isVerified: updatedModel.isVerified,
      token: generateToken(updatedModel._id),
    });
  } else {
    res.status(404);
    throw new Error('Model not found');
  }
});

// @desc    Delete a model
// @route   DELETE /api/models/:id
// @access  Private/Admin
const deleteModel = asyncHandler(async (req, res) => {
  const model = await Model.findById(req.params.id);

  if (model) {
    await model.remove();
    res.json({ message: 'model removed' });
  } else {
    res.status(404);
    throw new Error('model not found');
  }
});

// @desc    Update model
// @route   PUT /api/models/:id
// @access  Private/Admin
const updateModel = asyncHandler(async (req, res) => {
  const model = await Model.findById(req.params.id);

  if (model) {
    model.username = req.body.username || model.username;
    model.email = req.body.email || model.email;
    model.isVerified = req.body.isVerified;

    const updatedModel = await model.save();

    res.json(updatedModel);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Create new review
// @route   POST /api/models/:id/reviews
// @access  Private
const createModelReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const model = await Model.findById(req.params.id);

  if (model) {
    const alreadyReviewed = model.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Model already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    model.reviews.push(review);

    model.numReviews = model.reviews.length;

    model.rating =
      model.reviews.reduce((acc, item) => item.rating + acc, 0) /
      model.reviews.length;

    await model.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Model not found');
  }
});

export {
  getModels,
  getAllModels,
  getModelById,
  authModel,
  registerModel,
  getModelProfile,
  updateModelProfile,
  deleteModel,
  updateModel,
  createModelReview,
};
