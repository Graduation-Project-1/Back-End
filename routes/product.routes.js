const app = require('express').Router();
const { addProduct, updateProduct, deleteProduct, getProductById,getAllProducts 
    ,getAllProductsByVendor,getAllProductsByCategory,getAllProductsByCollection,
     getAllProductsWithFilter,productSearch,addOffer,getAllOffer } = require('../controller/product/product.controller');
const { addProductValidation, updateProductValidation,addOfferValidation } = require('../validation/product.validation');
const validator = require('../helper/validator/common.validate');
const isAuthorized = require("../helper/isAuthorized/isAuthorized");
const {
    ADD_PRODUCT,
    GET_PRODUCT_BY_ID,
    UPDATE_PRODUCT,
    DELETE_PRODUCT,
    GET_ALL_PRODUCT,
    GET_ALL_PRODUCT_BY_VENDOR,
    GET_ALL_PRODUCT_BY_CATEGORY,
    GET_ALL_PRODUCT_BY_COLLECTION,
    GET_ALL_PRODUCT_WITH_FILTER,
    PRODUCT_SEARCH,
    ADD_OFFER,
    GET_ALL_OFFER,} = require('../endPoints/endPoints');


app.post('/addProduct',[isAuthorized(ADD_PRODUCT),validator(addProductValidation)],addProduct);
app.get('/getProductById/:id',[isAuthorized(GET_PRODUCT_BY_ID)], getProductById);
app.put('/updateProduct/:id', [isAuthorized(UPDATE_PRODUCT),validator(updateProductValidation)], updateProduct);
app.delete('/deleteProduct/:id',[isAuthorized(DELETE_PRODUCT)], deleteProduct);
app.get('/getAllProducts',[isAuthorized(GET_ALL_PRODUCT)], getAllProducts);
app.get('/getAllProductsByVendor/:id',[isAuthorized(GET_ALL_PRODUCT_BY_VENDOR)], getAllProductsByVendor);
app.get('/getAllProductsByCategory/:id', [isAuthorized(GET_ALL_PRODUCT_BY_CATEGORY)],getAllProductsByCategory);
app.get('/getAllProductsByCollection/:id',[isAuthorized(GET_ALL_PRODUCT_BY_COLLECTION)], getAllProductsByCollection);
app.get('/getAllProductsWithFilter',[isAuthorized(GET_ALL_PRODUCT_WITH_FILTER)], getAllProductsWithFilter);
app.get("/productSearch",[isAuthorized(PRODUCT_SEARCH)], productSearch);
app.put('/addOffer/:id',[isAuthorized(ADD_OFFER),validator(addOfferValidation)],addOffer);
app.get('/getAllOffer',[isAuthorized(GET_ALL_OFFER)], getAllOffer);


module.exports = app;