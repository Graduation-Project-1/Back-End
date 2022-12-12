const User = require('../../models/user/user.repo');
const Product = require('../../models/product/product.repo');
const Vendor = require('../../models/vendor/vendor.repo');
const Collection = require('../../models/collection/collection.repo');
const bcrypt = require('bcrypt');
const saltRounds = 5;
var jwt = require('jsonwebtoken');


const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    let user = await User.isExist({email:email});
    if (user.success == false) {
        res.status(400).json({ message: "Please enter a valid email" })
    } else {
        let match = await bcrypt.compare(password, user.Data.password);
        if (match) {
            let token = jwt.sign({ id: user.Data._id, email : user.Data.email, role: user.Data.role }, process.env.SECRET_KEY);
            res.status(200).json({ message: "Success", token });
        } else {
            res.status(422).json({ message: "This password is invalid" })
        }
    }
}


const addUser = async(req,res)=>{
    const {email} = req.body;
    const userData = req.body;
    let userisExist = await User.isExist({email:email});
    if(userisExist.success == true){
        res.status(400).json({ 
            success: false,
            message: "this email is taken",
        });
    }else{
        const hashPassword =  await bcrypt.hash(userData.password, saltRounds);
        userData.password = hashPassword;
        userData.role = "user";
        let data = await User.create(userData);
        res.status(data.status).json(data);
    }
}

const getUser = async(req,res)=>{
    const {email} = req.user;
    let data = await User.isExist({email:email}, [], "-password");
    res.status(data.status).json(data);
}

const updateUser = async(req,res)=>{
    const id = req.params.id;
    const userData = req.body;
    let data = await User.update({_id : id}, userData);
    res.status(data.status).json(data);
}


const updateProfileUser = async(req,res)=>{
    const id = req.user.id;
    const userData = req.body;
    let data = await User.update({_id : id}, userData);
    res.status(data.status).json(data);
}


const deleteUser = async(req,res)=>{
    const id = req.params.id;
    let data = await User.delete({_id : id});
    res.status(data.status).json(data);
}


const deleteProfileUser = async(req,res)=>{
    const id = req.user.id;
    let data = await User.delete({_id : id});
    res.status(data.status).json(data);
}


const addToWishList = async(req,res)=>{
    const id = req.params.id;
    const {email} = req.user;
    let dataUser = await User.isExist({email:email});
    if(dataUser.Data.wishList.includes(id) == true){
        res.status(400).json({
            success: false,
            message: "this product already in wishList",
        });
    }else{
        const data  = await User.update({_id : dataUser.Data._id}, { $push: { wishList : id } })
        data.message = "this product is added to wishList";
        res.status(data.status).json(data);
    }
}

const deleteFromWishList = async(req,res)=>{
    const id = req.params.id;
    const {email} = req.user;
    let dataUser = await User.isExist({email:email});
    const data  = await User.update({_id : dataUser.Data._id}, { $pull: { wishList : id } })
    data.message = "this product is deleted from wishList";
    res.status(data.status).json(data);
}

const getWishList = async(req,res)=>{
    const {email} = req.user;
    console.log(req.user);
    let data = await User.isExist({email:email}, ["wishList"]);
    res.status(data.status).json({
        wishList : data.Data.wishList,
    });
}


const likeProduct = async(req,res)=>{
    const id = req.params.id;
    const {email} = req.user;
    let dataUser = await User.isExist({email:email});
    if(dataUser.success == true){
        if(dataUser.Data.productLikes.includes(id) == true){
            res.status(400).json({
                success: false,
                message: "this product already in productLikes",
            });
        }else{
            const data  = await User.update({_id : dataUser.Data._id}, { $push: { productLikes : id } })
            const productData = await Product.update({_id : id}, {$inc : {'numberOfLikes' : 1}})
            data.message = "this product is liked";
            res.status(data.status).json(data);
        }
    }else{
        res.status(dataUser.status).json(dataUser);
    }
}

const likeVendor = async(req,res)=>{
    const id = req.params.id;
    const {email} = req.user;
    let dataUser = await User.isExist({email:email});
    if(dataUser.success == true){
        if(dataUser.Data.vendorLikes.includes(id) == true){
            res.status(400).json({
                success: false,
                message: "this vendor already in vendorLikes",
            });
        }else{
            const data  = await User.update({_id : dataUser.Data._id}, { $push: { vendorLikes : id } })
            const vendorData = await Vendor.update({_id : id}, {$inc : {'numberOfLikes' : 1}})
            data.message = "this vendor is liked";
            res.status(data.status).json(data);
        }
    }else{
        res.status(dataUser.status).json(dataUser);
    }
    
}

const likeCollection = async(req,res)=>{
    const id = req.params.id;
    const {email} = req.user;
    let dataUser = await User.isExist({email:email});
    if(dataUser.success == true){
        if(dataUser.Data.collectionList.includes(id) == true){
            res.status(400).json({
                success: false,
                message: "this collection already in collectionList",
            });
        }else{
            const data  = await User.update({_id : dataUser.Data._id}, { $push: { collectionList : id } })
            const collectionData = await Collection.update({_id : id}, {$inc : {'numberOfLikes' : 1}})
            data.message = "this collection is liked";
            res.status(data.status).json(data);
        }
    }else{
        res.status(dataUser.status).json(dataUser);
    }
}


const getLikedProduct = async(req,res)=>{
    const {email} = req.user;
    let data = await User.isExist({email:email},['productLikes']);
    res.status(data.status).json({
        productLikes : data.Data.productLikes,
    });
}

const getLikedVendor = async(req,res)=>{
    const {email} = req.user;
    let data = await User.isExist({email:email},['vendorLikes']);
    res.status(data.status).json({
        vendorLikes : data.Data.vendorLikes,
    });
}


const getCollectionList = async(req,res)=>{
    const {email} = req.user;
    let data = await User.isExist({email:email},['collectionList']);
    res.status(data.status).json({
        collectionList : data.Data.collectionList,
    });
}


const getAllUsers = async(req,res)=>{
    let { page, size } = req.query;
    let data = await User.list({}, page, size, ["-password", "-cardNumber"]);
    res.status(data.status).json(data);
}


const getUserById = async(req,res)=>{
    const id = req.params.id;
    let data = await User.isExist({_id:id}, [],["-password", "-cardNumber"]);
    res.status(data.status).json(data);
}




module.exports = {
    loginUser,
    addUser,
    getUser,
    updateUser,
    deleteUser,
    addToWishList,
    deleteFromWishList,
    getWishList,
    likeProduct,
    likeVendor,
    likeCollection,
    getLikedProduct,
    getLikedVendor,
    getCollectionList,
    updateProfileUser,
    deleteProfileUser,
    getAllUsers,
    getUserById,
}