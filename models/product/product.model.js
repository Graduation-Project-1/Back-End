const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    numberOfReviews: {
        type: Number,
        default: 0,
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
    cover: {
        type: String,
        required: true,
    },
    gender : {
        type : String,
        required: true,
    },
    kids : {
        type : Boolean,
        required: true,
    },
    discountRate: {
        type: Number,
    },
    images: {
        type: Array,
        default: [],
    },
    availableSize: {
        type: Array,
        default: [],
    },
    availableColors: {
        type: Array,
        default: [],
    },
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor',
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    },
    collectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collection',
    },
})


const productModel = mongoose.model('product', productSchema);

module.exports = productModel;