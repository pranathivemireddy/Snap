const express = require('express');
const getItemsByCategory = require('../Controllers/clientController');

const clientRoute = express.Router();

// Customer GETs data
clientRoute.get('/items/:category', getItemsByCategory);

module.exports = clientRoute;

