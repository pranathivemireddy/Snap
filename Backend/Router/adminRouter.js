const express = require('express');
const getCategories = require('../Controllers/adminController');
const adminRouter = express.Router()

adminRouter.get('/allcategories',getCategories)
// adminRouter.post
module.exports=adminRouter;