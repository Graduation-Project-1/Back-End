const Item = require('../../models/item/item.fitting.repo');


const getItemById = async (req, res) => {
    const id = req.params.id;
    let data = await Item.isExist({ _id: id }, ['categoryList', { path: 'brandId', select: 'name' }]);
    res.status(data.status).json(data);
}


const updateItem = async (req, res) => {
    const id = req.params.id;
    const itemData = req.body;
    let data = await Item.update({ _id: id }, itemData);
    res.status(data.status).json(data);
}


const getAllItems = async (req, res) => {
    let { page, size } = req.query;
    console.log(`success`);
    // let hasModel = req?.query?.hasModel ? req.query.hasModel : false
    data = await Item.list({ isArchived: false }, page, size, { path: 'brandId', select: 'name' });
    res.status(data.status).json(data);
}

const getAllItemsByBrand = async (req, res) => {
    const id = req.params.id;
    let { page, size } = req.query;
    let data = await Item.list({ brandId: id }, page, size);
    res.status(data.status).json(data);
}


const getAllBrandItems = async (req, res) => {
    const id = req.query.id;
    let { page, size } = req.query;
    let data = await Item.list({ brandId: id }, page, size);
    res.status(data.status).json(data);
}


const getAllItemsByCategory = async (req, res) => {
    const id = req.params.id;
    let { page, size } = req.query;
    let data = await Item.list({ categoryList: id }, page, size);
    res.status(data.status).json(data);
}


const getAllItemsByCollection = async (req, res) => {
    const id = req.params.id;
    let { page, size } = req.query;
    let data = await Item.list({ collectionId: id }, page, size);
    res.status(data.status).json(data);
}


const getAllItemsWithFilter = async (req, res) => {
    let { brandId, categoryList, isArchived, priceMin, priceMax, page, size } = req.query;
    let query = {};
    if (brandId) {
        query.brandId = brandId;
    }
    if (categoryList) {
        query.categoryList = categoryList;
    }
    if (!isArchived) {
        isArchived = false;
    }
    query.price = { $lte: priceMax || 1000000000, $gte: priceMin || 0 };

    query.isArchived = false;

    let data = await Item.list(query, page, size, { path: 'brandId', select: 'name' });
    res.status(data.status).json(data);
}


const itemSearch = async (req, res) => {
    let { search, page, size } = req.query;
    let data = await Item.list({ name: { $regex: search, $options: 'i' } }, page, size)
    res.status(data.status).json(data);
}


const getAllOffer = async (req, res) => {
    let { brandId, discountMin, page, size } = req.query;
    let query = {};
    if (brandId) {
        query.brandId = brandId;
    }
    query.discountRate = { $gte: discountMin || 1 };
    let data = await Item.list(query, page, size);
    res.status(data.status).json(data);
}


const getMostLikedItems = async (req, res) => {
    let page = 1;
    let size = 20;
    let data;
    data = await Item.list({ isArchived: false }, page, size, { path: 'brandId', select: 'name' }, { numberOfLikes: -1 });
    res.status(data.status).json(data);
}



module.exports = {
    getItemById,
    updateItem,
    getAllItems,
    getAllItemsByBrand,
    getAllItemsByCategory,
    getAllItemsByCollection,
    getAllItemsWithFilter,
    itemSearch,
    getAllOffer,
    getMostLikedItems,
    getAllBrandItems,
}
