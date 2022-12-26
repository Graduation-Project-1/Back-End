const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    comment: {
        type: String,
    },
    rate: {
        type: Number,
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer',
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'item',
    },
})


const reviewModel = mongoose.model('review', reviewSchema);

module.exports = reviewModel;