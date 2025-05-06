const categoryModel = require('../Models/categorymodel'); 

const getCategories = async (req, res) => {
    try {
        console.log("Attempting to fetch categories...");
        const count = await categoryModel.countDocuments();
        console.log(`Total documents in collection: ${count}`);
        const allcategories = await categoryModel.find({},'name-_id');
        const categorynames=allcategories.map(cat => cat.name);
        console.log("categorynames",categorynames);
        res.status(200).json(allcategories);
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to get the Categories', error });
    }
};


module.exports = getCategories;
