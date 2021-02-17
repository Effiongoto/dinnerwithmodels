import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import models from './data/models.js';
import User from './models/userModel.js';
import Model from './models/modelModel.js';
import Subscription from './models/subscriptionModel.js';
import Payment from './models/paymentModel.js';
import Plan from './models/planModel.js';
import Carousel from './models/carouselModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Model.deleteMany();
    await User.deleteMany();
    await Subscription.deleteMany();
    await Payment.deleteMany();
    await Plan.deleteMany();
    await Carousel.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleModels = models.map((model) => {
      return { ...model, user: adminUser };
    });

    await Model.insertMany(sampleModels);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Model.deleteMany();
    await User.deleteMany();
    await Subscription.deleteMany();
    await Payment.deleteMany();
    await Plan.deleteMany();
    await Carousel.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
