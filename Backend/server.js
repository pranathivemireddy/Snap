const dotenv = require('dotenv');
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

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server started successfully at http://localhost:${port}`);
    });
});

module.exports = app;
