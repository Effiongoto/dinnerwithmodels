import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import Model from '../models/modelModel.js';

// @desc    Fetch all models
// @route   GET /api/models
// @access  Public
const getModels = asyncHandler(async (req, res) => {
  const models = await Model.find({});

  res.json(models);
});

// @desc    Fetch single model
// @route   GET /api/models/:id
// @access  Public
const getModelById = asyncHandler(async (req, res) => {
  const model = await Model.findById(req.params.id);

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
  const { username, email, password } = req.body;

  const modelExists = await Model.findOne({ email });

  if (modelExists) {
    res.status(400);
    throw new Error('Model already exists');
  }

  const model = await Model.create({
    username,
    email,
    password,
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
    res.json({
      _id: model._id,
      username: model.username,
      email: model.email,
      isVerified: model.isVerified,
    });
  } else {
    res.status(404);
    throw new Error('Model not found');
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateModelProfile = asyncHandler(async (req, res) => {
  const model = await Model.findById(req.model._id);

  if (model) {
    model.username = req.body.username || model.username;
    model.email = req.body.email || model.email;
    if (req.body.password) {
      model.password = req.body.password;
    }

    const updatedModel = await model.save();

    res.json({
      _id: updatedModel._id,
      name: updatedModel.name,
      email: updatedModel.email,
      isAdmin: updatedModel.isAdmin,
      token: generateToken(updatedModel._id),
    });
  } else {
    res.status(404);
    throw new Error('Model not found');
  }
});

export {
  getModels,
  getModelById,
  authModel,
  registerModel,
  getModelProfile,
  updateModelProfile,
};
