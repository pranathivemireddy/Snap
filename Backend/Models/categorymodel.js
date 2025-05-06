const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image_url:{
        type:String,
        required:true
    }
},{minimize:false})

const categoryModel = mongoose.models.categories || mongoose.model('categories', categorySchema)

module.exports = categoryModel;