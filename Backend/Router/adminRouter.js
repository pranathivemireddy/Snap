const express = require('express');
const getCategories = require('../Controllers/adminController');
const Item = require('../Models/FoodModel')
const adminRouter = express.Router()

adminRouter.get('/allcategories',getCategories)
// Example: Express route
adminRouter.put('/admin/items/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedItem = await ItemModel.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedItem) return res.status(404).json({ error: "Item not found" });
    res.json(updatedItem);
  }  catch (error) {
    console.error("Update error:", error.response?.data || error.message);
    toast.error("Update failed");
  }
  
});

adminRouter.delete('/items/:id', async (req, res) => {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});



module.exports = adminRouter;
