const app = require('express').Router();
const {loginVendor, addVendor, getVendor, updateVendor, deleteVendor, 
    getVendorById,getAllVendors,getAllCategoriesByVendor, vendorSearch,
updateProfileVendor, deleteProfileVendor } = require('../controller/vendor/vendor.controller');
const { addVendorValidation, loginVendorValidation, updateVendorValidation } = require('../validation/vendor.validation');
const validator = require('../helper/validator/common.validate');
const isAuthorized = require("../helper/isAuthorized/isAuthorized");
const {
    ADD_VENDOR,
    GET_VENDOR,
    UPDATE_VENDOR,
    DELETE_VENDOR,
    GET_VENDOR_BY_ID,
    GET__ALL_VENDOR,
    GET_ALL_CATEGORY_BY_VENDOR,
    VENDOR_SEARCH,
    UPDATE_PROFILE_VENDOR,
    DELETE_PROFILE_VENDOR,} = require('../endPoints/endPoints');


app.post('/loginVendor',validator(loginVendorValidation), loginVendor);
app.post('/addVendor',[isAuthorized(ADD_VENDOR),validator(addVendorValidation)], addVendor);
app.get('/getVendor',[isAuthorized(GET_VENDOR)], getVendor);
app.get('/getVendorById/:id',[isAuthorized(GET_VENDOR_BY_ID)], getVendorById);
app.put('/updateVendor/:id',[isAuthorized(UPDATE_VENDOR),validator(updateVendorValidation)], updateVendor);
app.delete('/deleteVendor/:id',[isAuthorized(DELETE_VENDOR)], deleteVendor);
app.get('/getAllVendors',[isAuthorized(GET__ALL_VENDOR)], getAllVendors);
app.get('/getAllCategoriesByVendor/:id',[isAuthorized(GET_ALL_CATEGORY_BY_VENDOR)], getAllCategoriesByVendor);
app.get("/vendorSearch",[isAuthorized(VENDOR_SEARCH)], vendorSearch);
app.put('/updateProfileVendor',[isAuthorized(UPDATE_PROFILE_VENDOR),validator(updateVendorValidation)], updateProfileVendor);
app.delete('/deleteProfileVendor',[isAuthorized(DELETE_PROFILE_VENDOR)], deleteProfileVendor);


module.exports = app;