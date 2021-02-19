const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const colors = require('colors');
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js');
const connectDB = require('./config/db.js');
const modelRoutes = require('./routes/modelRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const paymentRoutes = require('./routes/paymentRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const webHookRoutes = require('./routes/webhooksRoute.js');
const carouselRoutes = require('./routes/carouselRoutes.js');
dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use('/api/models', modelRoutes);
app.use('/api/users', userRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/carousel', carouselRoutes);
app.use('/hooks', webHookRoutes);

app.get('/api/config/paystack', (req, res) =>
  res.json({
    publicKey: process.env.PAYSTACK_PUBLIC_KEY,
  })
);

//Make uploads folder static
// const __dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use('/backend/uploads', express.static(__dirname + '/uploads'));

if (process.env.NODE_ENV !== 'development') {
  // app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.use(express.static(__dirname + '/build'));

  app.get('*', (req, res) => res.sendFile(__dirname + '/build/index.html'));
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
