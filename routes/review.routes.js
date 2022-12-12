const app = require('express').Router();
const { addReview, updateReview, deleteReview,
     getReviewById,getAllReviews } = require('../controller/review/review.controller');
const { addReviewValidation, updateReviewValidation } = require('../validation/review.validation');
const validator = require('../helper/validator/common.validate');
const isAuthorized = require("../helper/isAuthorized/isAuthorized");
const {
    ADD_REVIEW,
    GET_REVIEW_BY_ID,
    UPDATE_REVIEW,
    DELETE_REVIEW,
    GET_ALL_REVIEW,} = require('../endPoints/endPoints');


app.post('/addReview',[isAuthorized(ADD_REVIEW),validator(addReviewValidation)], addReview);
app.get('/getReviewById/:id',[isAuthorized(GET_REVIEW_BY_ID)], getReviewById);
app.put('/updateReview/:id',[isAuthorized(UPDATE_REVIEW),validator(updateReviewValidation)], updateReview);
app.delete('/deleteReview/:id',[isAuthorized(DELETE_REVIEW)], deleteReview);
app.get('/getAllReviews/:id',[isAuthorized(GET_ALL_REVIEW)], getAllReviews);


module.exports = app;