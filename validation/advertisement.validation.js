const Joi = require('joi');

const addAdvertisementValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().required().messages({
            "string.empty": "you have to enter the name",
            "any.required": "you have to enter the name",
        }),
        image: Joi.string().messages({
            "string.empty": "you have to enter the image",
        }),
        link: Joi.string().required().messages({
            "string.empty": "you have to enter the link",
            "any.required": "you have to enter the link",
        }),
    })
}

const updateAdvertisementValidation = {
    body: Joi.object().required().keys({
        name: Joi.string().messages({
            "string.empty": "you have to enter the name",
        }),
        image: Joi.string().messages({
            "string.empty": "you have to enter the image",
        }),
        link: Joi.string().messages({
            "string.empty": "you have to enter the link",
        }),
    })
}

module.exports = {
    addAdvertisementValidation,
    updateAdvertisementValidation,
}