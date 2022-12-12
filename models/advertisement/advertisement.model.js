const mongoose = require('mongoose');

const advertisementSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
})


const advertisementModel = mongoose.model('advertisement', advertisementSchema);

module.exports = advertisementModel;