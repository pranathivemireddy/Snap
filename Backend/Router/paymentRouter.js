// paymentRoute.js
const express = require('express');
const { createPaymentIntent, handleWebhook } = require('../Controllers/paymentController');

const paymentRouter = express.Router();

paymentRouter.post('/create-payment-intent',createPaymentIntent);
paymentRouter.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);

module.exports = paymentRouter;
