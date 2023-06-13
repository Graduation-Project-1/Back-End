const app = require('express').Router();
const { getItemById, getAllItems, getAllItemsByBrand, getAllItemsByCategory,
    getAllItemsByCollection, getAllItemsWithFilter, itemSearch, getAllOffer, getMostLikedItems,
    getAllBrandItems } = require('../../controller/fittingRoomItem/item.controller');


app.get('/getItemById/:id', getItemById);
app.get('/getAllItems', getAllItems);
app.get('/getAllItemsByBrand/:id', getAllItemsByBrand);
app.get('/getAllItemsByCategory/:id', getAllItemsByCategory);
app.get('/getAllItemsByCollection/:id', getAllItemsByCollection);
app.get('/getAllItemsWithFilter', getAllItemsWithFilter);
app.get("/itemSearch", itemSearch);
app.get('/getAllOffer', getAllOffer);
app.get('/getMostLikedItems', getMostLikedItems);
app.get('/getAllBrandItems', getAllBrandItems);

module.exports = app;