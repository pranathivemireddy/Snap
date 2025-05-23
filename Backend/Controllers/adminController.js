const categoryModel = require('../Models/categorymodel'); 

const getCategories = async (req, res) => {
    try {
        const categories = await categoryModel.find();
        if (categories.length === 0) {
            return res.status(404).json({ success: false, message: 'No Categories found' });
        }
        res.status(200).json(categories );
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to get the Categories', error });
    }
};


module.exports = getCategories;
