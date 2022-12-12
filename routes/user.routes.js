const app = require('express').Router();
const {loginUser, addUser, getUser, updateUser, deleteUser,addToWishList,deleteFromWishList,
likeProduct, likeVendor, likeCollection,getLikedProduct,getLikedVendor,
getCollectionList, updateProfileUser, deleteProfileUser,getAllUsers,getUserById,getWishList } = require('../controller/user/user.controller');
const {loginUserValidation, addUserValidation, updateUserValidation } = require('../validation/user.validation');
const validator = require('../helper/validator/common.validate');
const isAuthorized = require("../helper/isAuthorized/isAuthorized");
const {  
    GET_USER,
    UPDATE_USER,
    DELETE_USER,
    ADD_TO_WISH_LIST,
    DELETE_FROM_WISH_LIST,
    LIKE_PRODUCT,
    LIKE_VENDOR,
    LIKE_COLLECTION,
    GET_COLLECTION_LIST,
    GET_LIKED_PRODUCT,
    GET_LIKED_VENDOR,
    UPDATE_PROFILE_USER,
    DELETE_PROFILE_USER,
    GET_ALL_USER,
    GET_USER_BY_ID,
    GET_WISH_LIST} = require('../endPoints/endPoints');



app.post('/loginUser',validator(loginUserValidation), loginUser);
app.post('/addUser',[validator(addUserValidation)], addUser);
app.get('/getUser',[isAuthorized(GET_USER)], getUser);
app.put('/updateUser/:id',[isAuthorized(UPDATE_USER), validator(updateUserValidation)], updateUser);
app.delete('/deleteUser/:id',[isAuthorized(DELETE_USER)], deleteUser);
app.post('/addToWishList/:id',[isAuthorized(ADD_TO_WISH_LIST)], addToWishList);
app.delete('/deleteFromWishList/:id',[isAuthorized(DELETE_FROM_WISH_LIST)], deleteFromWishList);
app.get('/likeProduct/:id',[isAuthorized(LIKE_PRODUCT)], likeProduct);
app.get('/likeVendor/:id',[isAuthorized(LIKE_VENDOR)], likeVendor);
app.get('/likeCollection/:id',[isAuthorized(LIKE_COLLECTION)], likeCollection);
app.get('/getLikedProduct',[isAuthorized(GET_LIKED_PRODUCT)], getLikedProduct);
app.get('/getLikedVendor',[isAuthorized(GET_LIKED_VENDOR)], getLikedVendor);
app.get('/getCollectionList',[isAuthorized(GET_COLLECTION_LIST)], getCollectionList);
app.put('/updateProfileUser',[isAuthorized(UPDATE_PROFILE_USER), validator(updateUserValidation)], updateProfileUser);
app.delete('/deleteProfileUser',[isAuthorized(DELETE_PROFILE_USER)], deleteProfileUser);
app.get('/getAllUsers',[isAuthorized(GET_ALL_USER)], getAllUsers);
app.get('/getUserById/:id',[isAuthorized(GET_USER_BY_ID)], getUserById);
app.get('/getWishList',[isAuthorized(GET_WISH_LIST)], getWishList);

module.exports = app;