const Vendor = require('../../models/vendor/vendor.repo');
const bcrypt = require('bcrypt');
const saltRounds = 5;
var jwt = require('jsonwebtoken');


const loginVendor = async(req,res)=>{
    const {email,password} = req.body;
    let vendor = await Vendor.isExist({email:email});
    if (vendor.success == false) {
        res.status(400).json({ message: "Please enter a valid email" })
    } else {
        let match = await bcrypt.compare(password, vendor.Data.password);
        if (match) {
            let token = jwt.sign({ id: vendor.Data._id, email : vendor.Data.email, role: vendor.Data.role }, process.env.SECRET_KEY);
            res.status(200).json({ message: "Success", token });
        } else {
            res.status(422).json({ message: "This password is invalid" })
        }
    }
}


const addVendor = async(req,res)=>{
    const {email} = req.body;
    const vendorData = req.body;
    let vendorisExist = await Vendor.isExist({email:email});
    if(vendorisExist.success == true){
        res.status(400).json({ 
            success: false,
            message: "this email is taken",
        });
    }else{
        const hashPassword =  await bcrypt.hash(vendorData.password, saltRounds);
        vendorData.password = hashPassword;
        vendorData.role = "vendor";
        let data = await Vendor.create(vendorData);
        res.status(data.status).json(data);
    }
}

const getVendor = async(req,res)=>{
    const {email} = req.user;
    let data = await Vendor.isExist({email:email}, [], "-password");
    res.status(data.status).json(data);
}

const getAllVendors = async(req,res)=>{
    let { page, size } = req.query;
    let data = await Vendor.list({}, page, size, "-password");
    res.status(data.status).json(data);
}

const getVendorById = async(req,res)=>{
    const id = req.params.id;
    let data = await Vendor.isExist({_id:id}, [],"-password");
    res.status(data.status).json(data);
}

const updateVendor = async(req,res)=>{
    const id = req.params.id;
    const vendorData = req.body;
    let data = await Vendor.update({_id:id}, vendorData);
    res.status(data.status).json(data);
}

const updateProfileVendor = async(req,res)=>{
    const id = req.user.id;
    const vendorData = req.body;
    let data = await Vendor.update({_id:id}, vendorData);
    res.status(data.status).json(data);
}


const deleteVendor = async(req,res)=>{
    const id = req.params.id;
    let data = await Vendor.delete({_id:id});
    res.status(data.status).json(data);
}


const deleteProfileVendor = async(req,res)=>{
    const id = req.user.id;
    let data = await Vendor.delete({_id:id});
    res.status(data.status).json(data);
}


const getAllCategoriesByVendor = async(req,res)=>{
    const id = req.params.id;
    let data = await Vendor.isExist({_id:id}, ['categoryList']);
    res.status(data.status).json({
        categoryList : data.Data.categoryList,
    });
}

const vendorSearch = async (req, res) => {
    let { page, size, search } = req.query;
    let data = await Vendor.list({ name: { $regex: search, $options: 'i' } }, page, size, "-password");
    res.status(data.status).json(data);
}


module.exports = {
    loginVendor,
    addVendor,
    getVendor,
    getVendorById,
    updateVendor,
    deleteVendor,
    getAllVendors,
    getAllCategoriesByVendor,
    vendorSearch,
    updateProfileVendor,
    deleteProfileVendor,
}