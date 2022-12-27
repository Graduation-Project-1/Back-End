const Item = require('../../models/item/item.repo');
const Collection = require('../../models/collection/collection.repo');
const Customer = require('../../models/customer/customer.repo');
const ItemReview = require('../../models/itemReview/item.review.repo');


const addItem = async(req,res)=>{
    const itemData = req.body;
    let data = await Item.create(itemData);
    res.status(data.status).json(data);
}


const getItemById = async(req,res)=>{
    const id = req.params.id;
    let data = await Item.isExist({_id : id},['categoryList', { path: 'brandId', select: 'name' }]);
    res.status(data.status).json(data);
}

const updateItem = async(req,res)=>{
    const id = req.params.id;
    const itemData = req.body;
    let data = await Item.update({_id : id}, itemData);
    res.status(data.status).json(data);
}


const deleteItem = async(req,res)=>{
    const id = req.params.id;
    let data = await Item.delete({_id : id});
    await ItemReview.deleteList({itemId : id});
    await Customer.updateList({ likedItems: id }, { '$pull': { likedItems: id }});
    await Collection.updateList({ itemsList: id }, { '$pull': { itemsList: id }});
    res.status(data.status).json(data); 
}

const getAllItems = async(req,res)=>{
    let { page, size } = req.query;
    let data = await Item.list({},page,size, { path: 'brandId', select: 'name' });
    res.status(data.status).json(data);
}

const getAllItemsByBrand = async(req,res)=>{
    const id = req.params.id;
    let { page, size } = req.query;
    let data = await Item.list({brandId : id},page,size);
    res.status(data.status).json(data);
}

const getAllItemsByCategory = async(req,res)=>{
    const id = req.params.id;
    let { page, size } = req.query;
    let data = await Item.list({categoryList : id},page,size);
    res.status(data.status).json(data);
}

const getAllItemsByCollection = async(req,res)=>{
    const id = req.params.id;
    let { page, size } = req.query;
    let data = await Item.list({collectionId : id},page,size);
    res.status(data.status).json(data);
}

const getAllItemsWithFilter = async(req,res)=>{
    let {brandId, categoryList,priceMin, priceMax, page, size } = req.query;
    let query= {};
    if(brandId){
        query.brandId = brandId;
    }
    if(categoryList){
        query.categoryList = categoryList;
    }
    query.price = { $lte: priceMax || 1000000000, $gte: priceMin || 0 };
    let data = await Item.list(query,page,size, { path: 'brandId', select: 'name' });
    res.status(data.status).json(data);
}

const itemSearch = async (req, res) => {
    let { search, page, size} = req.query;
    let data = await Item.list({ name: { $regex: search, $options: 'i' } },page,size)
    res.status(data.status).json(data);
}


const addOffer = async (req, res) => {
    const id = req.params.id;
    const itemData = req.body;
    let data = await Item.update({_id : id}, itemData);
    data.message = "offer is added"
    res.status(data.status).json(data);
}


const getAllOffer = async(req,res)=>{
    const {role} = req.user;
    let {brandId,discountMin, page, size } = req.query;
    let query= {};
    if(brandId){
        query.brandId = brandId;
    }
    if(role == "vendor"){
        query.brandId = req.user.id;
    }
    query.discountRate = { $gte: discountMin || 1 };
    let data = await Item.list(query,page,size);
    res.status(data.status).json(data);
}


const getMostLikedItems = async(req,res)=>{
    let page = 1;
    let size = 20;
    let data = await Item.list({},page,size, { path: 'brandId', select: 'name' }, { numberOfLikes : -1});
    res.status(data.status).json(data);
}


module.exports = {
    addItem,
    getItemById,
    updateItem,
    deleteItem,
    getAllItems,
    getAllItemsByBrand,
    getAllItemsByCategory,
    getAllItemsByCollection,
    getAllItemsWithFilter,
    itemSearch,
    addOffer,
    getAllOffer,
    getMostLikedItems,
}