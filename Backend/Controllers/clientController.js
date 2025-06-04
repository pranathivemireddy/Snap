const getFoodModelByCategory = require('../Models/FoodModel')

const getItemsByCategory = async (req, res) => {
  const category = req.params.category.toLowerCase();
  // console.log("Requested category:", category);

  try {
    const FoodModel = getFoodModelByCategory(category);

    if (!FoodModel) {
      return res.status(404).json({ message: `No model found for ${category}` });
    }

    const items = await FoodModel.find();

    if (!items || items.length === 0) {
      return res.status(404).json({ message: `No items found for ${category}` });
    }

    res.status(200).json(items);
  } catch (err) {
    console.error("Error fetching items:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = getItemsByCategory;
