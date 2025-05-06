const categoryModel = require('../Models/categorymodel'); 

const getCategories = async (req, res) => {
    try {
        const allcategories = await categoryModel.find();
        console.log(allcategories);
        res.status(200).json(allcategories);
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to get the Categories', error });
    }
};


module.exports = { getCategories };
