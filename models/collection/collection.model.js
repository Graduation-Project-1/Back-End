const mongoose = require('mongoose');

const collectionSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    season: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
    },
    image: {
        type: String,
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
    productList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    }],
    categoryList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    }],
    vendorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor',
    },
})


const collectionModel = mongoose.model('collection', collectionSchema);

module.exports = collectionModel;