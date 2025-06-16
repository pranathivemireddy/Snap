const express = require('express');
const getCategories = require('../Controllers/adminController');
const getFoodModelByCategory = require('../Models/FoodModel');

const adminRouter = express.Router();

// Get all categories
adminRouter.get('/allcategories', getCategories);
// In adminRouter file
adminRouter.get('/items/:category', async (req, res) => {
  const { category } = req.params;
  const FoodModel = getFoodModelByCategory(category);

  try {
    const items = await FoodModel.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});


// Add item (POST)
adminRouter.post('/items/:category', async (req, res) => {
  const { category } = req.params;
  const FoodModel = getFoodModelByCategory(category);
  const newItem = new FoodModel(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// Edit item (PUT)
adminRouter.put('/items/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  const FoodModel = getFoodModelByCategory(category);
  try {
    const updatedItem = await FoodModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) return res.status(404).json({ error: "Item not found" });
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to update item",message:error.message });
  }
});

adminRouter.delete('/items/:category/:id', async (req, res) => {
  const { category, id } = req.params;
  const FoodModel = getFoodModelByCategory(category);

  try {
    const deleted = await FoodModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Item not found for deletion" });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error("Delete error:", error); 
    res.status(500).json({ error: 'Failed to delete item', details: error.message });
  }
});


module.exports = adminRouter;
