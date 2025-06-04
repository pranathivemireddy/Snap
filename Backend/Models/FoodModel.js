const mongoose = require('mongoose');

const foodSchema =  new mongoose.Schema({
    id: {
      type: Number,
      required: false,
    },
    cuisineName: {
      type: String,
      required: true,
    },
    cuisineImg: {
      type: String,
      required: true,
    },
    cuisinePrice: {
      type: Number,
      required: true,
    },
    servesFor: {
      type: String,
      required: true,
    },
    cuisineDescription: {
      type: String,
      required: true,
    },
    spicyLevel: {
      type: String,
      required: true,
    },
    veganFriendly: {
      type: Boolean, 
      required: true,
    },
    category: {
      type: String,
      required: false,
    }
  }, { minimize: false });

function getFoodModelByCategory(category) {
  const modelName = category.toLowerCase();
  return mongoose.models[modelName] || mongoose.model(modelName, foodSchema, modelName);
}

module.exports = getFoodModelByCategory;
