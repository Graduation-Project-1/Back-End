const mongoose = require('mongoose');

const advertisementSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    link: {
        type: String,
    },
})


const advertisementModel = mongoose.model('advertisement', advertisementSchema);

module.exports = advertisementModel;