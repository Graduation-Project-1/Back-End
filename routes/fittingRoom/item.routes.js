const app = require('express').Router();
const { getItemById, getAllItems, getAllItemsByBrand, getAllItemsByCategory,
    getAllItemsByCollection, getAllItemsWithFilter, itemSearch, getAllOffer, getMostLikedItems,
    getAllBrandItems } = require('../../controller/fittingRoomItem/item.controller');


app.get('/fitting/getItemById/:id', getItemById);
app.get('/fitting/getAllItems', getAllItems);
app.get('/fitting/getAllItemsByBrand/:id', getAllItemsByBrand);
app.get('/fitting/getAllItemsByCategory/:id', getAllItemsByCategory);
app.get('/fitting/getAllItemsByCollection/:id', getAllItemsByCollection);
app.get('/fitting/getAllItemsWithFilter', getAllItemsWithFilter);
app.get("/fitting/itemSearch", itemSearch);
app.get('/fitting/getAllOffer', getAllOffer);
app.get('/fitting/getMostLikedItems', getMostLikedItems);
app.get('/fitting/getAllBrandItems', getAllBrandItems);

module.exports = app;