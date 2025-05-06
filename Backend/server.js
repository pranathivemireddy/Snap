const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./Config/dbconnect');
const adminRouter = require('./Router/adminRouter');
// const clientRouter = require('./Router/clientRouter')

const app = express(); 

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

const port = process.env.PORT || 3214;

app.use(express.json());

app.use('/admin', adminRouter); // Example: http://localhost:3214/admin/allcategories

console.log("MONGO_URI from env:", process.env.MONGO_URI);

connectDB().then(
    async () => {
        const directTest = await mongoose.connection.db.collection('categories').find().toArray();
        console.log("Direct collection access test:", directTest);
//       } => {
//     app.listen(port, () => {
//         console.log(`Server started successfully at http://localhost:${port}`);
//     });
// }).catch(err => {
//     console.error("DB connection failed:", err);
// });
    })

module.exports = app;
