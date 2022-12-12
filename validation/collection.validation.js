const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const addCollectionValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().required().messages({
            "string.empty": "you have to enter the name",
            "any.required": "you have to enter the name",
        }),
        season: Joi.string().required().messages({
            "string.empty": "you have to enter the season",
            "any.required": "you have to enter the season",
        }),
        date: Joi.date().messages({
            "date.base": "you should enter vaild date",
        }),
        image: Joi.string().required().messages({
            "string.empty": "you have to enter the image",
            "any.required": "you have to enter the image",
        }),
        productList: Joi.array().items(Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),),
        vendorId: Joi.objectId().required().messages({
            "any.required": "You have to enter vendor Id",
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
    })
}


const updateCollectionValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().messages({
            "string.empty": "you have to enter the name",
        }),
        season: Joi.string().messages({
            "string.empty": "you have to enter the season",
        }),
        date: Joi.date().messages({
            "date.base": "you should enter vaild date",
        }),
        image: Joi.string().messages({
            "string.empty": "you have to enter the image",
        }),
        productList: Joi.array().items(Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),),
        vendorId: Joi.objectId().messages({
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
    })
}

module.exports = {
    addCollectionValidation,
    updateCollectionValidation,
}