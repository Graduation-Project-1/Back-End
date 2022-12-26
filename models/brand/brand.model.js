const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
    phone : { 
         type : Array ,
         default : [], 
    },
    categoryList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    }],
    role : {
        type : String,
        required : true,
    },
})


const brandModel = mongoose.model('brand', brandSchema);

module.exports = brandModel;