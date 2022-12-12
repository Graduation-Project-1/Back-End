const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    location: {
        type: String,
    },
    image: {
        type: String,
    },
    referralLink: {
        type: String,
    },
    accountType: {
        type: String,
    },
    cardNumber: { 
        type : Array ,
        default : [], 
    },
    numberOfPeopleUseReferralLink: {
        type: Number,
        default: 0,
    },
    wishList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    }],
    vendorLikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'vendor',
    }],
    productLikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
    }],
    collectionList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'collection',
    }],
    role : {
        type : String,
        required : true,
    },
})


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;