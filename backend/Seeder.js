const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const users = require('./data/users.js');
const models = require('./data/models.js');
const User = require('./models/userModel.js');
const Model = require('./models/modelModel.js');
const Subscription = require('./models/subscriptionModel.js');
const Payment = require('./models/paymentModel.js');
const Plan = require('./models/planModel.js');
const Carousel = require('./models/carouselModel.js');
const connectDB = require('./config/db.js');

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
