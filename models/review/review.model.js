const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    comment: {
        type: String,
    },
    rate: {
        type: Number,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    },
})


const reviewModel = mongoose.model('review', reviewSchema);

module.exports = reviewModel;