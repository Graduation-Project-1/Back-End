const app = require('express').Router();
const { getCustomer, updateCustomer, addToWishList, deleteFromWishList,
    likeItem, likeBrand, likeCollection, getLikedItems, getLikedBrands,
    getlikedCollections, updateProfileCustomer, getCustomerById, 
    getWishList } = require('../../controller/fittingRoomCustomer/customer.controller');


app.get('/fitting/getCustomer', getCustomer);
app.put('/fitting/updateCustomer/:id', updateCustomer);
app.post('/fitting/addToWishList/:id', addToWishList);
app.delete('/fitting/deleteFromWishList/:id', deleteFromWishList);
app.get('/fitting/getWishList', getWishList);
app.get('/fitting/likeItem/:id', likeItem);
app.get('/fitting/likeBrand/:id', likeBrand);
app.get('/fitting/likeCollection/:id', likeCollection);
app.get('/fitting/getLikedItems', getLikedItems);
app.get('/fitting/getLikedBrands', getLikedBrands);
app.get('/fitting/getlikedCollections', getlikedCollections);
app.put('/fitting/updateProfileCustomer', updateProfileCustomer);
app.get('/fitting/getCustomerById/:id', getCustomerById);

module.exports = app;