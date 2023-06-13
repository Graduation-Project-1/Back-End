const app = require('express').Router();
const { getCustomer, updateCustomer, addToWishList, deleteFromWishList,
    likeItem, likeBrand, likeCollection, getLikedItems, getLikedBrands,
    getlikedCollections, updateProfileCustomer, getCustomerById, 
    getWishList } = require('../../controller/fittingRoomCustomer/customer.controller');


app.get('/getCustomer', getCustomer);
app.put('/updateCustomer/:id', updateCustomer);
app.post('/addToWishList/:id', addToWishList);
app.delete('/deleteFromWishList/:id', deleteFromWishList);
app.get('/getWishList', getWishList);
app.get('/likeItem/:id', likeItem);
app.get('/likeBrand/:id', likeBrand);
app.get('/likeCollection/:id', likeCollection);
app.get('/getLikedItems', getLikedItems);
app.get('/getLikedBrands', getLikedBrands);
app.get('/getlikedCollections', getlikedCollections);
app.put('/updateProfileCustomer', updateProfileCustomer);
app.get('/getCustomerById/:id', getCustomerById);

module.exports = app;