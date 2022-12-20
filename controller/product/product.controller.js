const Product = require('../../models/product/product.repo');

const addProduct = async(req,res)=>{
    const productData = req.body;
    let data = await Product.create(productData);
    res.status(data.status).json(data);
}


const getProductById = async(req,res)=>{
    const id = req.params.id;
    let data = await Product.isExist({_id : id},['categoryList']);
    res.status(data.status).json(data);
}

const updateProduct = async(req,res)=>{
    const id = req.params.id;
    const productData = req.body;
    let data = await Product.update({_id : id}, productData);
    res.status(data.status).json(data);
}


const deleteProduct = async(req,res)=>{
    const id = req.params.id;
    let data = await Product.delete({_id : id});
    res.status(data.status).json(data);
}

const getAllProducts = async(req,res)=>{
    let { page, size } = req.query;
    let data = await Product.list({},page,size);
    res.status(data.status).json(data);
}

const getAllProductsByVendor = async(req,res)=>{
    const id = req.params.id;
    let { page, size } = req.query;
    let data = await Product.list({vendorId : id},page,size);
    res.status(data.status).json(data);
}

const getAllProductsByCategory = async(req,res)=>{
    const id = req.params.id;
    let { page, size } = req.query;
    let data = await Product.list({categoryId : id},page,size);
    res.status(data.status).json(data);
}

const getAllProductsByCollection = async(req,res)=>{
    const id = req.params.id;
    let { page, size } = req.query;
    let data = await Product.list({collectionId : id},page,size);
    res.status(data.status).json(data);
}

const getAllProductsWithFilter = async(req,res)=>{
    let {vendorId, categoryList, collectionId,priceMin, priceMax, page, size } = req.query;
    let query= {};
    if(vendorId){
        query.vendorId = vendorId;
    }
    if(categoryList){
        query.categoryList = categoryList;
    }
    if(collectionId){
        query.collectionId = collectionId;
    }
    query.price = { $lte: priceMax || 1000000000, $gte: priceMin || 0 };
    let data = await Product.list(query,page,size);
    res.status(data.status).json(data);
}

const productSearch = async (req, res) => {
    let { search, page, size} = req.query;
    let data = await Product.list({ name: { $regex: search, $options: 'i' } },page,size)
    res.status(data.status).json(data);
}


const addOffer = async (req, res) => {
    const id = req.params.id;
    const productData = req.body;
    let data = await Product.update({_id : id}, productData);
    data.message = "offer is added"
    res.status(data.status).json(data);
}


const getAllOffer = async(req,res)=>{
    const {role} = req.user;
    let {vendorId,discountMin, page, size } = req.query;
    let query= {};
    if(vendorId){
        query.vendorId = vendorId;
    }
    if(role == "vendor"){
        query.vendorId = req.user.id;
    }
    query.discountRate = { $gte: discountMin || 1 };
    let data = await Product.list(query,page,size);
    res.status(data.status).json(data);
}


module.exports = {
    addProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllProductsByVendor,
    getAllProductsByCategory,
    getAllProductsByCollection,
    getAllProductsWithFilter,
    productSearch,
    addOffer,
    getAllOffer,
}