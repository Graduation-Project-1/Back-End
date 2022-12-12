const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const addReviewValidation = {
    body: Joi.object().required().keys({
        comment: Joi.string().messages({
            "string.empty": "you have to enter the comment",
        }),
        rate: Joi.number().messages({
            "number.base": "please enter a valid rate"
        }),
        productId: Joi.objectId().required().messages({
            "string.empty": "You have to enter product Id",
            "any.required": "You have to enter product Id",
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
    })
}


const updateReviewValidation = {
    body: Joi.object().required().keys({
        comment: Joi.string().messages({
            "string.empty": "you have to enter the comment",
        }),
        rate: Joi.number().messages({
            "number.base": "please enter a valid rate"
        }),
        productId: Joi.objectId().messages({
            "string.empty": "You have to enter product Id",
            "string.pattern.name" : "you should enter vaild ObjectId",
        }),
    })
}


module.exports = {
    addReviewValidation,
    updateReviewValidation,
}