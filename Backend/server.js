const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/dbconnect');
const adminRouter = require('./Router/adminRouter');

dotenv.config();
const app = express();

const port = process.env.PORT || 3214;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use('/admin', adminRouter); // e.g., http://localhost:3214/admin/allcategories
connectDB()
  .then(async () => {
      app.listen(port, () => {
      console.log(`Server started successfully at http://localhost:${port}`);
    });
  })
  .catch(err => {
    console.error("DB connection failed:", err);
  });

module.exports = app;
